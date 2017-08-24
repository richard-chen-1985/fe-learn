let fs = require('fs');
let path = require('path');
let express = require('express');
let router = express.Router();

let dataFile = path.resolve(__dirname, './data.json');
let summaryFile = path.resolve(__dirname, './summary.json');
let historyFile = path.resolve(__dirname, './history.json');

let dataMemo = JSON.parse(readData());

function readData(file) {
    let data;
    try {
        data = fs.readFileSync(file ? file : dataFile).toString();
    } catch(e) {
        console.log('读取数据文件出错！');
    }
    return data;
}

function saveData(data) {
    //暂时关掉写数据
    //fs.writeFileSync(dataFile, JSON.stringify(data));
}

router.get('/all', function(req, res, next) {
    res.json(dataMemo);
});

router.get('/userinfo', function(req, res, next) {
    res.json(dataMemo);
});

router.get('/agents', function(req, res, next) {
    res.json(dataMemo);
});

router.post('/agents/add', function(req, res, next) {
    let name = req.body.name;
    let ip = req.body.ip;
    let agent = {
        "denied": false,
        "avatarImg": "",
        "avatarUrl": "/",
        "title": name,
        "status": "idle",
        "ip": ip,
        "dir": "/var/lib/cruise-agent",
        "resources": ["ubuntu", "firefox"]
    };
    dataMemo.agents.push(agent);
    res.json({ success: true, data: agent });
});

router.get('/history', function(req, res, next) {
    res.json(JSON.parse(readData(historyFile)));
});

router.get('/deny', function(req, res, next) {
    let aid = parseInt(req.query.aid);
    if(isNaN(aid)) {
        res.json({ error: '参数id必须是一个数字！' });
        return;
    }
    if(dataMemo.agents[aid]) {
        dataMemo.agents[aid].denied = true
    }
    res.json({ success: true });
});

router.post('/resource/add', function(req, res, next) {
    let aid = req.body.aid;
    let resource = req.body.rs;
    if(!aid || !resource) {
        res.json({ error: '缺少参数！' });
        return;
    }
    if(dataMemo.agents[aid]) {
        dataMemo.agents[aid].resources = dataMemo.agents[aid].resources.concat(resource);
    }
    res.json({ data: dataMemo.agents[aid].resources });
});

router.get('/resource/del', function(req, res, next) {
    let aid = req.query.aid;
    let rsid = req.query.rsid;
    if(!aid || !rsid) {
        res.json({ error: '缺少参数！' });
        return;
    }
    if(dataMemo.agents[aid]) {
        dataMemo.agents[aid].resources.splice(rsid, 1);
    }
    res.json({ success: true });
});

module.exports = router;