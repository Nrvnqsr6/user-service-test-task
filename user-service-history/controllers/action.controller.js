import { db } from "../models/index.js";
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru.js'
import { validationResult } from "express-validator";
dayjs.locale(ru)
const Action = db.actions;

export function createAction(req, res) {
    const action = {
        user_id: req.body.user_id,
        action_type: req.body.action_type,
    };

    Action.create(action)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message,
            })
        });
};

export async function findAction(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send(errors.array());
    const properties = await MakeResponseProperties(req);
    res.render('actions', properties);
}

async function MakeResponseProperties(req, res){
    if (!req.query.page)
        req.query.page = 1;

    let actions;
    const count = await Count(req.query.user_id);
    const perPage = PerPage(req.query.perPage, count);
    const perPagePrint = PerPagePrint(req, perPage);
    const offset = Offset(perPage, req.query.page);
    const params = await Params(req.query.user_id, perPage, offset)
    let pages = Pages(count, perPage)
    actions = await Action.findAll(params)

    let toShow = perPage;
    if (actions.length < perPage)
        toShow = actions.length

    return {
        actions: actions,
        user_id: req.query.user_id,
        current: req.query.page,
        pages: pages,
        perPage: perPage,
        perPagePrint: perPagePrint,
        toShow: toShow,
        dayjs: dayjs,
    }
}

async function Count(user_id){
    if (user_id){
        return await Action.count({
            where: {
                user_id: user_id,
            }
        });
    }
    else {
        return await Action.count();
    }
}

function PerPage(perPage, count){
    if (!perPage)
        count > 10 ? perPage = 10 : perPage = count;
    if (perPage > count)
        perPage = count;

    return perPage
}

function Offset(perPage, page){
    return perPage * (page - 1);
}

async function Params(user_id, perPage, offset){
    if (user_id){
        return {
            where: {
                user_id: user_id,
            },
            limit : perPage,
            offset: offset,
        };

    }
    else {
        return {
            limit : perPage,
            offset: offset,
        };
    }
}

function Pages(count, perPage){
    if (perPage == 0)
        return 0
    return Math.ceil(count/perPage)
}

function PerPagePrint(req, perPage){
    if (req.query.perPage < perPage || req.query.perPage === undefined )
        return perPage;
    else return req.query.perPage;
}