var configs =
{
    WebApi: 'http://localhost:17605/',
    PageSize: 20,
    MenuData: [
        {
            "Url": null, "text": "人员/车辆管控中心", "expanded": true, "leaf": false,
            "children":
                [
                    { "text": "人员巡查计划", 'Icon': '', "Url": "TianZun.view.person.PersonProwledPlanList", "expanded": false, "leaf": true, "children": [] },
                    { "text": "人员巡查路线", 'Icon': '', "Url": "TianZun.view.person.PersonProwledRouteList", "expanded": false, "leaf": true, "children": [] },
                    { "text": "人员排班计划", 'Icon': '', "Url": "TianZun.view.person.PersonArrangePlanList", "expanded": false, "leaf": true, "children": [] },
                    { "text": "车辆巡查计划", 'Icon': '', "Url": "TianZun.view.car.CarProwledPlanList", "expanded": false, "leaf": true, "children": [] },
                    { "text": "车辆巡查路线", 'Icon': '', "Url": "TianZun.view.car.CarProwledRouteList", "expanded": false, "leaf": true, "children": [] }
                ]
        }
    ]
};