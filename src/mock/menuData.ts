// 提取自星云SaaS线上真实登录会话的全量菜单路由树
export interface MenuItem {
  path: string;
  name?: string;
  redirect?: string;
  addBtn?: number;
  isShowAddBtn?: number | boolean;
  id?: number;
  parentId?: number | null;
  pathList?: number[];
  meta: {
    title: string;
    icon?: string;
    showLink?: boolean;
    rank?: number;
    badge?: number | string;
    i18n?: boolean;
    roles?: string[];
    menuType?: number;
    remark?: string;
    tenantId?: string;
    perms?: string;
    keppAlive?: boolean;
    menuId?: string;
    dynamicLevel?: number;
  };
  children?: MenuItem[];
}

export const WHOLE_MENUS: MenuItem[] = [
  {
    "path": "/prevorder",
    "name": "prevorder",
    "addBtn": 0,
    "children": [],
    "meta": {
      "icon": "icon-shangyou",
      "title": "上游订单",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:prevorder",
      "keppAlive": true,
      "menuId": "3a02c1d8-3a2b-34eb-0e15-ad09c921f31a",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 0,
    "parentId": null,
    "pathList": [
      0
    ]
  },
  {
    "path": "/operation",
    "name": "operation",
    "addBtn": 0,
    "children": [
      {
        "path": "/operation/order",
        "name": "order",
        "addBtn": 0,
        "children": [
          {
            "path": "/operation/order/orderlist",
            "name": "orderlist",
            "addBtn": 1,
            "children": [
              {
                "path": "/operation/order/orderlist/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:insert",
                  "keppAlive": true,
                  "menuId": "34d703fd-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/operation/order/orderlist/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:update",
                  "keppAlive": true,
                  "menuId": "34d8ff09-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/operation/order/orderlist/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:delete",
                  "keppAlive": true,
                  "menuId": "34dafb63-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  2
                ]
              },
              {
                "path": "/operation/order/orderlist/oaudit",
                "name": "oaudit",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "审核订单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:oaudit",
                  "keppAlive": true,
                  "menuId": "34ce1a01-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  3
                ]
              },
              {
                "path": "/operation/order/orderlist/ocaudit",
                "name": "ocaudit",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "取消审核",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:ocaudit",
                  "keppAlive": true,
                  "menuId": "34cfc92d-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  4
                ]
              },
              {
                "path": "/operation/order/orderlist/oimport",
                "name": "oimport",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "转入运单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:oimport",
                  "keppAlive": true,
                  "menuId": "34d10dd0-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  5
                ]
              },
              {
                "path": "/operation/order/orderlist/ocimport",
                "name": "ocimport",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "取消转入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:order:orderlist:ocimport",
                  "keppAlive": true,
                  "menuId": "34d32a13-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 6,
                "parentId": 0,
                "pathList": [
                  1,
                  0,
                  0,
                  6
                ]
              }
            ],
            "meta": {
              "icon": "icon-order",
              "title": "订单总表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:order:orderlist",
              "keppAlive": true,
              "menuId": "938e539f-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              1,
              0,
              0
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "订单管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:operation:order",
          "keppAlive": true,
          "menuId": "3a046d19-5960-572e-834f-995f9bf908f5",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 1,
        "pathList": [
          1,
          0
        ]
      },
      {
        "path": "/operation/ship",
        "name": "ship",
        "addBtn": 0,
        "children": [
          {
            "path": "/operation/ship/shiplist",
            "name": "shiplist",
            "addBtn": 1,
            "children": [
              {
                "path": "/operation/ship/shiplist/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:insert",
                  "keppAlive": true,
                  "menuId": "3488051d-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  0
                ]
              },
              {
                "path": "/operation/ship/shiplist/mutipleupdate",
                "name": "mutipleupdate",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "EditPen",
                  "title": "批量修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:mutipleupdate",
                  "keppAlive": true,
                  "menuId": "3a219d6e-c140-3150-793f-ca1a5334e699",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  1
                ]
              },
              {
                "path": "/operation/ship/shiplist/fill",
                "name": "fill",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "手动补单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:fill",
                  "keppAlive": true,
                  "menuId": "6c18fa7d-3984-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  2
                ]
              },
              {
                "path": "/operation/ship/shiplist/copy",
                "name": "copy",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "复制",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:copy",
                  "keppAlive": true,
                  "menuId": "6de54dbc-3013-11ed-8581-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  3
                ]
              },
              {
                "path": "/operation/ship/shiplist/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:update",
                  "keppAlive": true,
                  "menuId": "34898139-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  4
                ]
              },
              {
                "path": "/operation/ship/shiplist/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:delete",
                  "keppAlive": true,
                  "menuId": "348ac338-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  5
                ]
              },
              {
                "path": "/operation/ship/shiplist/printorder",
                "name": "printorder",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Printer",
                  "title": "打印托运单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiporder:printorder",
                  "keppAlive": true,
                  "menuId": "def760c2-3013-11ed-8581-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 6,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  6
                ]
              },
              {
                "path": "/operation/ship/shiplist/printtag",
                "name": "printtag",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Printer",
                  "title": "打印标签",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiporder:printtag",
                  "keppAlive": true,
                  "menuId": "defb5e62-3013-11ed-8581-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 7,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  7
                ]
              },
              {
                "path": "/operation/ship/shiplist/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:import",
                  "keppAlive": true,
                  "menuId": "938e1392-eae8-11ec-8634-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 8,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  8
                ]
              },
              {
                "path": "/operation/ship/shiplist/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shiplist:export",
                  "keppAlive": true,
                  "menuId": "de5332f6-3984-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 9,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  9
                ]
              },
              {
                "path": "/yprintshiporder",
                "name": "yprintshiporder",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "托运单打印预览",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "",
                  "keppAlive": true,
                  "menuId": "3a0d385e-9b8a-0246-13e5-e104f91e6b46",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 10,
                "parentId": 1,
                "pathList": [
                  1,
                  1,
                  1,
                  10
                ]
              }
            ],
            "meta": {
              "icon": "icon-shiporder",
              "title": "运单管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:ship:shiplist",
              "keppAlive": true,
              "menuId": "938e44dc-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 1,
            "pathList": [
              1,
              1,
              1
            ]
          },
          {
            "path": "/operation/ship/shipdetail",
            "name": "shipdetail",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/ship/shipdetail/odetail",
                "name": "odetail",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "运单详情",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:odetail",
                  "keppAlive": true,
                  "menuId": "87c2f4da-3987-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  0
                ]
              },
              {
                "path": "/operation/ship/shipdetail/olocus",
                "name": "olocus",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "运单跟踪",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:olocus",
                  "keppAlive": true,
                  "menuId": "87cb70c0-3987-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  1
                ]
              },
              {
                "path": "/operation/ship/shipdetail/ofinance",
                "name": "ofinance",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "财务管理",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:ofinance",
                  "keppAlive": true,
                  "menuId": "87ccdd17-3987-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  2
                ]
              },
              {
                "path": "/operation/ship/shipdetail/oupdate",
                "name": "oupdate",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "改单记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:oupdate",
                  "keppAlive": true,
                  "menuId": "87ce6f20-3987-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  3
                ]
              },
              {
                "path": "/operation/ship/shipdetail/oimage",
                "name": "oimage",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "图片管理",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:oimage",
                  "keppAlive": true,
                  "menuId": "87cfc76c-3987-11ed-a279-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 4,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  4
                ]
              },
              {
                "path": "/operation/ship/shipdetail/obacksign",
                "name": "obacksign",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "#",
                  "title": "回单及签收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:obacksign",
                  "keppAlive": true,
                  "menuId": "59bc881e-eb19-11ed-82a2-b8cef6825032",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 6,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  6
                ]
              },
              {
                "path": "/operation/ship/shipdetail/osms",
                "name": "osms",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "短信发送",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:shipdetail:osms",
                  "keppAlive": true,
                  "menuId": "3a1ab34f-924f-9f10-5248-edb8b7803b31",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 7,
                "parentId": 2,
                "pathList": [
                  1,
                  1,
                  2,
                  7
                ]
              }
            ],
            "meta": {
              "icon": "",
              "title": "运单综合查询",
              "i18n": false,
              "remark": "",
              "menuType": 4,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:ship:shipdetail",
              "keppAlive": true,
              "menuId": "dc85c7a2-3985-11ed-a279-18c04d580c33",
              "showLink": true,
              "dynamicLevel": 1
            },
            "id": 2,
            "parentId": 1,
            "pathList": [
              1,
              1,
              2
            ]
          },
          {
            "path": "/operation/ship/translist",
            "name": "translist",
            "addBtn": 1,
            "children": [
              {
                "path": "/operation/ship/translist/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:insert",
                  "keppAlive": true,
                  "menuId": "348d01b0-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  0
                ]
              },
              {
                "path": "/operation/ship/translist/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:update",
                  "keppAlive": true,
                  "menuId": "348e8eef-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  1
                ]
              },
              {
                "path": "/operation/ship/translist/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:delete",
                  "keppAlive": true,
                  "menuId": "348ffc07-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  2
                ]
              },
              {
                "path": "/operation/ship/translist/depart",
                "name": "depart",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "确认发车",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:depart",
                  "keppAlive": true,
                  "menuId": "9c58e5e2-0e1f-11ed-9f66-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  3
                ]
              },
              {
                "path": "/operation/ship/translist/canceldepart",
                "name": "canceldepart",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "取消发车",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:canceldepart",
                  "keppAlive": true,
                  "menuId": "9c5b463f-0e1f-11ed-9f66-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  4
                ]
              },
              {
                "path": "/operation/ship/translist/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:export",
                  "keppAlive": true,
                  "menuId": "348be4b9-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  5
                ]
              },
              {
                "path": "/operation/ship/translist/printlist",
                "name": "printlist",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Printer",
                  "title": "打印大车清单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:printlist",
                  "keppAlive": true,
                  "menuId": "72cb76e8-3014-11ed-8581-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 6,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  6
                ]
              },
              {
                "path": "/operation/ship/translist/printht",
                "name": "printht",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Printer",
                  "title": "打印运输合同",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:printht",
                  "keppAlive": true,
                  "menuId": "72cd7970-3014-11ed-8581-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 7,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  7
                ]
              },
              {
                "path": " /operation/ship/translist/fillship",
                "name": "fillship",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": " 补单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:fillship",
                  "keppAlive": true,
                  "menuId": "3a0e8122-de04-f5eb-48bc-8303b0dadfbf",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 8,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  8
                ]
              },
              {
                "path": "/operation/ship/translist/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:translist:import",
                  "keppAlive": true,
                  "menuId": "3a1c1bc2-12a2-2795-f4fa-e36431595f3e",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 9,
                "parentId": 3,
                "pathList": [
                  1,
                  1,
                  3,
                  9
                ]
              }
            ],
            "meta": {
              "icon": "icon-tran1",
              "title": "干线配载",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:ship:translist",
              "keppAlive": true,
              "menuId": "938e4691-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 1,
            "pathList": [
              1,
              1,
              3
            ]
          },
          {
            "path": "/operation/ship/stranslist",
            "name": "stranslist",
            "addBtn": 1,
            "children": [
              {
                "path": "/operation/ship/stranslist/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:stranslist:insert",
                  "keppAlive": true,
                  "menuId": "349255af-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 4,
                "pathList": [
                  1,
                  1,
                  4,
                  0
                ]
              },
              {
                "path": "/operation/ship/stranslist/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:stranslist:update",
                  "keppAlive": true,
                  "menuId": "3493a92b-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 4,
                "pathList": [
                  1,
                  1,
                  4,
                  1
                ]
              },
              {
                "path": "/operation/ship/stranslist/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:stranslist:delete",
                  "keppAlive": true,
                  "menuId": "3494be3c-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 4,
                "pathList": [
                  1,
                  1,
                  4,
                  2
                ]
              },
              {
                "path": "/operation/ship/stranslist/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:stranslist:export",
                  "keppAlive": true,
                  "menuId": "34913560-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 4,
                "pathList": [
                  1,
                  1,
                  4,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-tran2",
              "title": "短途配载",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:ship:stranslist",
              "keppAlive": true,
              "menuId": "938e4842-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 1,
            "pathList": [
              1,
              1,
              4
            ]
          },
          {
            "path": "/operation/ship/cartrack",
            "name": "cartrack",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/ship/cartrack/track",
                "name": "track",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "跟踪",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:cartrack:track",
                  "keppAlive": true,
                  "menuId": "34977a5d-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 5,
                "pathList": [
                  1,
                  1,
                  5,
                  0
                ]
              },
              {
                "path": "/operation/ship/cartrack/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:ship:cartrack:export",
                  "keppAlive": true,
                  "menuId": "3499fdf0-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 5,
                "pathList": [
                  1,
                  1,
                  5,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-track2",
              "title": "车辆跟踪",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:ship:cartrack",
              "keppAlive": true,
              "menuId": "938e4913-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 5,
            "parentId": 1,
            "pathList": [
              1,
              1,
              5
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "发货管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:operation:ship",
          "keppAlive": true,
          "menuId": "3a046d14-9679-7e50-7564-ae1c03df1a26",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 1,
        "parentId": 1,
        "pathList": [
          1,
          1
        ]
      },
      {
        "path": "/operation/arrive",
        "name": "arrive",
        "addBtn": 0,
        "children": [
          {
            "path": "/operation/arrive/arriveconfirm",
            "name": "arriveconfirm",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/arrive/arriveconfirm/line",
                "name": "line",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/arrive/arriveconfirm/line/confirm",
                    "name": "confirm",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "确认到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:line:confirm",
                      "keppAlive": true,
                      "menuId": "71f48637-0f0e-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      1,
                      2,
                      0,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/line/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:line:cancel",
                      "keppAlive": true,
                      "menuId": "71f68027-0f0e-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      1,
                      2,
                      0,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/line/fillship",
                    "name": "fillship",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "到达补单",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:line:fillship",
                      "keppAlive": true,
                      "menuId": "71f849ff-0f0e-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      1,
                      2,
                      0,
                      0,
                      2
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "干线配载",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveconfirm:line",
                  "keppAlive": true,
                  "menuId": "50961e0d-0f0e-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  1,
                  2,
                  0,
                  0
                ]
              },
              {
                "path": "/operation/arrive/arriveconfirm/short",
                "name": "short",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/arrive/arriveconfirm/short/confirm",
                    "name": "confirm",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "search.png",
                      "title": "确认到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:short:confirm",
                      "keppAlive": true,
                      "menuId": "349b32ee-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      1,
                      2,
                      0,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/short/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Plus",
                      "title": "取消到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:short:cancel",
                      "keppAlive": true,
                      "menuId": "349c897a-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      1,
                      2,
                      0,
                      1,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "短途配载",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveconfirm:short",
                  "keppAlive": true,
                  "menuId": "5097ee3e-0f0e-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  1,
                  2,
                  0,
                  1
                ]
              },
              {
                "path": "/operation/arrive/arriveconfirm/assign",
                "name": "assign",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/arrive/arriveconfirm/assign/confirm",
                    "name": "confirm",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "确认到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:assign:confirm",
                      "keppAlive": true,
                      "menuId": "349dddfe-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 2,
                    "pathList": [
                      1,
                      2,
                      0,
                      2,
                      0
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/assign/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:assign:cancel",
                      "keppAlive": true,
                      "menuId": "349f0449-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 2,
                    "pathList": [
                      1,
                      2,
                      0,
                      2,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "到货分拨",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveconfirm:assign",
                  "keppAlive": true,
                  "menuId": "5099c8d1-0f0e-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  1,
                  2,
                  0,
                  2
                ]
              },
              {
                "path": "/operation/arrive/arriveconfirm/loadgoods",
                "name": "loadgoods",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/arrive/arriveconfirm/loadgoods/load",
                    "name": "load",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "中途装货",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:loadgoods:load",
                      "keppAlive": true,
                      "menuId": "825d1161-0f14-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 3,
                    "pathList": [
                      1,
                      2,
                      0,
                      3,
                      0
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/loadgoods/unload",
                    "name": "unload",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "卸货",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:loadgoods:unload",
                      "keppAlive": true,
                      "menuId": "825fb3c6-0f14-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 3,
                    "pathList": [
                      1,
                      2,
                      0,
                      3,
                      1
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/loadgoods/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消卸货",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:loadgoods:cancel",
                      "keppAlive": true,
                      "menuId": "82612351-0f14-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 3,
                    "pathList": [
                      1,
                      2,
                      0,
                      3,
                      2
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "中途装卸货",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveconfirm:loadgoods",
                  "keppAlive": true,
                  "menuId": "509b3808-0f0e-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  1,
                  2,
                  0,
                  3
                ]
              },
              {
                "path": "/operation/arrive/arriveconfirm/arriveship",
                "name": "arriveship",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/arrive/arriveconfirm/arriveship/confirm",
                    "name": "confirm",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "确认到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:arriveship:confirm",
                      "keppAlive": true,
                      "menuId": "b85a1c3a-0f15-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 4,
                    "pathList": [
                      1,
                      2,
                      0,
                      4,
                      0
                    ]
                  },
                  {
                    "path": "/operation/arrive/arriveconfirm/arriveship/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消到达",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:arriveconfirm:arriveship:cancel",
                      "keppAlive": true,
                      "menuId": "b85c8576-0f15-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 4,
                    "pathList": [
                      1,
                      2,
                      0,
                      4,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "到达运单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveconfirm:arriveship",
                  "keppAlive": true,
                  "menuId": "509d2861-0f0e-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 4,
                "parentId": 0,
                "pathList": [
                  1,
                  2,
                  0,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-arrive",
              "title": "到达确认",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:arrive:arriveconfirm",
              "keppAlive": true,
              "menuId": "938e4a62-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 2,
            "pathList": [
              1,
              2,
              0
            ]
          },
          {
            "path": "/operation/arrive/arriveassign",
            "name": "arriveassign",
            "addBtn": 1,
            "children": [
              {
                "path": "/operation/arrive/arriveassign/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveassign:insert",
                  "keppAlive": true,
                  "menuId": "34a18bc0-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  1,
                  2,
                  1,
                  0
                ]
              },
              {
                "path": "/operation/arrive/arriveassign/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveassign:update",
                  "keppAlive": true,
                  "menuId": "34a2b35e-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  1,
                  2,
                  1,
                  1
                ]
              },
              {
                "path": "/operation/arrive/arriveassign/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveassign:delete",
                  "keppAlive": true,
                  "menuId": "34a3d24c-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  1,
                  2,
                  1,
                  2
                ]
              },
              {
                "path": "/operation/arrive/arriveassign/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:arriveassign:export",
                  "keppAlive": true,
                  "menuId": "34a05062-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  1,
                  2,
                  1,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-assign",
              "title": "到货分拨",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:arrive:arriveassign",
              "keppAlive": true,
              "menuId": "938e4b71-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 2,
            "pathList": [
              1,
              2,
              1
            ]
          },
          {
            "path": "/operation/arrive/homelist",
            "name": "homelist",
            "addBtn": 1,
            "children": [
              {
                "path": "/operation/arrive/homelist/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:homelist:insert",
                  "keppAlive": true,
                  "menuId": "f62ecd82-1489-11ed-823c-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  1,
                  2,
                  2,
                  0
                ]
              },
              {
                "path": "/operation/arrive/homelist/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:homelist:update",
                  "keppAlive": true,
                  "menuId": "f63011f3-1489-11ed-823c-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  1,
                  2,
                  2,
                  1
                ]
              },
              {
                "path": "/operation/arrive/homelist/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:homelist:delete",
                  "keppAlive": true,
                  "menuId": "f631ca68-1489-11ed-823c-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 2,
                "pathList": [
                  1,
                  2,
                  2,
                  2
                ]
              },
              {
                "path": "/operation/arrive/homelist/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:homelist:export",
                  "keppAlive": true,
                  "menuId": "f62cd3db-1489-11ed-823c-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 2,
                "pathList": [
                  1,
                  2,
                  2,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-home",
              "title": "送货上门",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:arrive:homelist",
              "keppAlive": true,
              "menuId": "19a6ac2a-1310-11ed-919f-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 2,
            "pathList": [
              1,
              2,
              2
            ]
          },
          {
            "path": "/operation/arrive/signlist",
            "name": "signlist",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/arrive/signlist/selfsign",
                "name": "selfsign",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/uploadFile",
                    "name": "uploadFile",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "图片上传",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "",
                      "keppAlive": true,
                      "menuId": "3a0bc612-b7de-1de4-1042-45175c515c8e",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      1,
                      2,
                      3,
                      0,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "自提签收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:signlist:selfsign",
                  "keppAlive": true,
                  "menuId": "51d6cf99-13e9-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  1,
                  2,
                  3,
                  0
                ]
              },
              {
                "path": "/operation/arrive/signlist/outsign",
                "name": "outsign",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "外发签收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:signlist:outsign",
                  "keppAlive": true,
                  "menuId": "51d88d80-13e9-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  1,
                  2,
                  3,
                  1
                ]
              },
              {
                "path": "/operation/arrive/signlist/deliversign",
                "name": "deliversign",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "送货签收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:signlist:deliversign",
                  "keppAlive": true,
                  "menuId": "51da44e5-13e9-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 3,
                "pathList": [
                  1,
                  2,
                  3,
                  2
                ]
              },
              {
                "path": "/operation/arrive/signlist/directsign",
                "name": "directsign",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "直送签收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:signlist:directsign",
                  "keppAlive": true,
                  "menuId": "51db9bed-13e9-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 3,
                "pathList": [
                  1,
                  2,
                  3,
                  3
                ]
              },
              {
                "path": "/operation/arrive/signlist/signrecord",
                "name": "signrecord",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/arrive/signlist/signrecord/export",
                    "name": "export",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Download",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:signlist:signrecord:export",
                      "keppAlive": true,
                      "menuId": "34b59de4-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 4,
                    "pathList": [
                      1,
                      2,
                      3,
                      4,
                      0
                    ]
                  },
                  {
                    "path": "/operation/arrive/signlist/signrecord/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消签收",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:arrive:signlist:signrecord:cancel",
                      "keppAlive": true,
                      "menuId": "34b84430-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 4,
                    "pathList": [
                      1,
                      2,
                      3,
                      4,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "已签收记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:arrive:signlist:signrecord",
                  "keppAlive": true,
                  "menuId": "51dd9a65-13e9-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 4,
                "parentId": 3,
                "pathList": [
                  1,
                  2,
                  3,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-sign",
              "title": "签收管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:arrive:signlist",
              "keppAlive": true,
              "menuId": "938e4fc3-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 2,
            "pathList": [
              1,
              2,
              3
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "到货管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:operation:arrive",
          "keppAlive": true,
          "menuId": "3a046d16-87b0-be1d-3d6d-20da824a888d",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 2,
        "parentId": 1,
        "pathList": [
          1,
          2
        ]
      },
      {
        "path": "/operation/out",
        "name": "out",
        "addBtn": 0,
        "children": [
          {
            "path": "/operation/out/localoutgo",
            "name": "localoutgo",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/out/localoutgo/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增本地外发",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:localoutgo:add",
                  "keppAlive": true,
                  "menuId": "f6979299-0e24-11ed-9f66-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  1,
                  3,
                  0,
                  0
                ]
              },
              {
                "path": "/operation/out/localoutgo/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/out/localoutgo/record/print",
                    "name": "print",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Printer",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:localoutgo:record:print",
                      "keppAlive": true,
                      "menuId": "34b96c78-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      0,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/operation/out/localoutgo/record/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:localoutgo:record:update",
                      "keppAlive": true,
                      "menuId": "34bc1108-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      0,
                      1,
                      1
                    ]
                  },
                  {
                    "path": "/operation/out/localoutgo/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消外发",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:localoutgo:record:cancel",
                      "keppAlive": true,
                      "menuId": "34bd74d3-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      0,
                      1,
                      2
                    ]
                  },
                  {
                    "path": "/operation/out/localoutgo/record/preview",
                    "name": "preview",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Printer",
                      "title": "打印预览",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:localoutgo:record:preview",
                      "keppAlive": true,
                      "menuId": "c7057973-3991-11ed-a279-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      0,
                      1,
                      3
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "本地外发记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:localoutgo:record",
                  "keppAlive": true,
                  "menuId": "f699ad79-0e24-11ed-9f66-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  1,
                  3,
                  0,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-local",
              "title": "本地外发",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:out:localoutgo",
              "keppAlive": true,
              "menuId": "938e5053-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 3,
            "pathList": [
              1,
              3,
              0
            ]
          },
          {
            "path": "/operation/out/terminaloutgo",
            "name": "terminaloutgo",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/out/terminaloutgo/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增终端外发",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:terminaloutgo:add",
                  "keppAlive": true,
                  "menuId": "c89c9316-0f02-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  1,
                  3,
                  1,
                  0
                ]
              },
              {
                "path": "/operation/out/terminaloutgo/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/out/terminaloutgo/record/print",
                    "name": "print",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Printer",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:terminaloutgo:record:print",
                      "keppAlive": true,
                      "menuId": "34be9e3c-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      1,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/operation/out/terminaloutgo/record/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:terminaloutgo:record:update",
                      "keppAlive": true,
                      "menuId": "34c122ab-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      1,
                      1,
                      1
                    ]
                  },
                  {
                    "path": "/operation/out/terminaloutgo/record/preview",
                    "name": "preview",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Printer",
                      "title": "打印预览",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:terminaloutgo:record:preview",
                      "keppAlive": true,
                      "menuId": "8e0df70e-3991-11ed-a279-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      1,
                      1,
                      2
                    ]
                  },
                  {
                    "path": "/operation/out/terminaloutgo/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消外发",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:terminaloutgo:record:cancel",
                      "keppAlive": true,
                      "menuId": "a4e5a41c-0f03-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      1,
                      1,
                      3
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "终端外发记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:terminaloutgo:record",
                  "keppAlive": true,
                  "menuId": "c89e16d8-0f02-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  1,
                  3,
                  1,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-dest",
              "title": "终端外发",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:out:terminaloutgo",
              "keppAlive": true,
              "menuId": "938e512f-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 3,
            "pathList": [
              1,
              3,
              1
            ]
          },
          {
            "path": "/operation/out/sendout",
            "name": "sendout",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/out/sendout/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增送出外发",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:sendout:add",
                  "keppAlive": true,
                  "menuId": "a85356a3-0f04-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  1,
                  3,
                  2,
                  0
                ]
              },
              {
                "path": "/operation/out/sendout/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/operation/out/sendout/record/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:sendout:record:update",
                      "keppAlive": true,
                      "menuId": "34c635b8-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      2,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/operation/out/sendout/record/delete",
                    "name": "delete",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "删除",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:sendout:record:delete",
                      "keppAlive": true,
                      "menuId": "34cce040-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      2,
                      1,
                      1
                    ]
                  },
                  {
                    "path": "/operation/out/sendout/record/depart",
                    "name": "depart",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Plus",
                      "title": "发车",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:sendout:record:depart",
                      "keppAlive": true,
                      "menuId": "63504882-1882-11ed-b0b3-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      2,
                      1,
                      2
                    ]
                  },
                  {
                    "path": "/operation/out/sendout/record/export",
                    "name": "export",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Download",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:sendout:record:export",
                      "keppAlive": true,
                      "menuId": "34c3b6b2-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      2,
                      1,
                      3
                    ]
                  },
                  {
                    "path": "/operation/out/sendout/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消发车",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:operation:out:sendout:record:cancel",
                      "keppAlive": true,
                      "menuId": "a856cd21-0f04-11ed-8abc-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 4,
                    "parentId": 1,
                    "pathList": [
                      1,
                      3,
                      2,
                      1,
                      4
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "送出外发记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:sendout:record",
                  "keppAlive": true,
                  "menuId": "a8554f97-0f04-11ed-8abc-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  1,
                  3,
                  2,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-tran2",
              "title": "送出外发",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:out:sendout",
              "keppAlive": true,
              "menuId": "938e51db-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 3,
            "pathList": [
              1,
              3,
              2
            ]
          },
          {
            "path": "/operation/out/outrack",
            "name": "outrack",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/out/outrack/track",
                "name": "track",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "跟踪",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:outrack:track",
                  "keppAlive": true,
                  "menuId": "8ca4fd5d-1f84-11ed-bedf-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  1,
                  3,
                  3,
                  0
                ]
              },
              {
                "path": "/operation/out/outrack/batchTrack",
                "name": "batchTrack",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "批量跟踪",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:outrack:batchTrack",
                  "keppAlive": true,
                  "menuId": "8ca6d52d-1f84-11ed-bedf-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  1,
                  3,
                  3,
                  1
                ]
              },
              {
                "path": "/operation/out/outrack/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:out:outrack:export",
                  "keppAlive": true,
                  "menuId": "34ca0739-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 3,
                "pathList": [
                  1,
                  3,
                  3,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-track",
              "title": "外发跟踪",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:out:outrack",
              "keppAlive": true,
              "menuId": "938e525d-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 3,
            "pathList": [
              1,
              3,
              3
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "外发管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:operation:out",
          "keppAlive": true,
          "menuId": "3a046d18-5e41-bde2-da37-22946379c474",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 3,
        "parentId": 1,
        "pathList": [
          1,
          3
        ]
      },
      {
        "path": "/operation/else",
        "name": "else",
        "addBtn": 0,
        "children": [
          {
            "path": "/operation/else/updorder",
            "name": "updorder",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-update",
              "title": "更改单据",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:else:updorder",
              "keppAlive": true,
              "menuId": "938e541b-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 4,
            "pathList": [
              1,
              4,
              0
            ]
          },
          {
            "path": "/operation/else/updlist",
            "name": "updlist",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/else/updlist/orderupdlist",
                "name": "orderupdlist",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "运单改单记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:updlist:orderupdlist",
                  "keppAlive": true,
                  "menuId": "34e62aad-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  1,
                  4,
                  1,
                  0
                ]
              },
              {
                "path": "/operation/else/updlist/tranupdlist",
                "name": "tranupdlist",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "配载改单记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:updlist:tranupdlist",
                  "keppAlive": true,
                  "menuId": "34e39eac-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  1,
                  4,
                  1,
                  1
                ]
              },
              {
                "path": "/operation/else/updlist/switchupdlist",
                "name": "switchupdlist",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "中转改单记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:updlist:switchupdlist",
                  "keppAlive": true,
                  "menuId": "34e25030-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  1,
                  4,
                  1,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-updhistory",
              "title": "改单历史",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:else:updlist",
              "keppAlive": true,
              "menuId": "938e5974-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 4,
            "pathList": [
              1,
              4,
              1
            ]
          },
          {
            "path": "/operation/else/abolish",
            "name": "abolish",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/else/abolish/aborder",
                "name": "aborder",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "作废运单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:abolish:aborder",
                  "keppAlive": true,
                  "menuId": "34e75c0a-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  1,
                  4,
                  2,
                  0
                ]
              },
              {
                "path": "/operation/else/abolish/aborderlist",
                "name": "aborderlist",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "运单作废记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:abolish:aborderlist",
                  "keppAlive": true,
                  "menuId": "34e8a401-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  1,
                  4,
                  2,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-abolish",
              "title": "作废运单",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:else:abolish",
              "keppAlive": true,
              "menuId": "938e5a56-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 4,
            "pathList": [
              1,
              4,
              2
            ]
          },
          {
            "path": "/operation/else/stock",
            "name": "stock",
            "addBtn": 0,
            "children": [
              {
                "path": "/operation/else/stock/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:stock:insert",
                  "keppAlive": true,
                  "menuId": "34eda4ea-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  1,
                  4,
                  3,
                  0
                ]
              },
              {
                "path": "/operation/else/stock/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:stock:update",
                  "keppAlive": true,
                  "menuId": "34eefde6-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  1,
                  4,
                  3,
                  1
                ]
              },
              {
                "path": "/operation/else/stock/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:operation:else:stock:delete",
                  "keppAlive": true,
                  "menuId": "34f01d33-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 3,
                "pathList": [
                  1,
                  4,
                  3,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-dict",
              "title": "运单库存",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:operation:else:stock",
              "keppAlive": true,
              "menuId": "938e5af1-eae8-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 4,
            "pathList": [
              1,
              4,
              3
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "其它",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:operation:else",
          "keppAlive": true,
          "menuId": "3a046d1b-1d29-f28d-eb9d-c5a685bccc1e",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 4,
        "parentId": 1,
        "pathList": [
          1,
          4
        ]
      }
    ],
    "meta": {
      "icon": "icon-operationCenter",
      "title": "营运中心",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:operation",
      "keppAlive": true,
      "menuId": "3a02c1e7-a9f5-2b02-49a3-1fd30fd3a2ab",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 1,
    "parentId": null,
    "pathList": [
      1
    ]
  },
  {
    "path": "/finance",
    "name": "finance",
    "addBtn": 0,
    "children": [
      {
        "path": "/finance/else",
        "name": "else",
        "addBtn": 0,
        "children": [
          {
            "path": "/finance/else/fcar",
            "name": "fcar",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/else/fcar/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:add",
                  "keppAlive": true,
                  "menuId": "e6777689-5c24-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/finance/else/fcar/upd",
                "name": "upd",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:upd",
                  "keppAlive": true,
                  "menuId": "e679aff5-5c24-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/finance/else/fcar/del",
                "name": "del",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:del",
                  "keppAlive": true,
                  "menuId": "e67b3a32-5c24-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  2
                ]
              },
              {
                "path": "/finance/else/fcar/audit",
                "name": "audit",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "审核",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:audit",
                  "keppAlive": true,
                  "menuId": "e67cb3fa-5c24-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  3
                ]
              },
              {
                "path": "/finance/else/fcar/faudit",
                "name": "faudit",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "反审核",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:faudit",
                  "keppAlive": true,
                  "menuId": "e67e2da7-5c24-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  4
                ]
              },
              {
                "path": "/finance/else/fcar/daochu",
                "name": "daochu",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:daochu",
                  "keppAlive": true,
                  "menuId": "3a0f45c0-df98-1ae7-bc2f-dbede113a544",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  5
                ]
              },
              {
                "path": "/finance/else/fcar/add",
                "name": "dayin",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "打印",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:fcar:dayin",
                  "keppAlive": true,
                  "menuId": "3a0f45c2-0ee8-58fd-a5fb-0a8a40adccf6",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 6,
                "parentId": 0,
                "pathList": [
                  2,
                  0,
                  0,
                  6
                ]
              }
            ],
            "meta": {
              "icon": "icon-carcost",
              "title": "出车费用",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:else:fcar",
              "keppAlive": true,
              "menuId": "a22b3e78-5c24-11ed-9917-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              2,
              0,
              0
            ]
          },
          {
            "path": "/finance/else/insurelist",
            "name": "insurelist",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/else/insurelist/query",
                "name": "query",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Search",
                  "title": "余额查询",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:else:insurelist:query",
                  "keppAlive": true,
                  "menuId": "d1efdd71-51d9-11ed-8418-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  2,
                  0,
                  1,
                  0
                ]
              }
            ],
            "meta": {
              "icon": "icon-insure",
              "title": "投保记录",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:else:insurelist",
              "keppAlive": true,
              "menuId": "a7f48723-51d9-11ed-8418-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              2,
              0,
              1
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "其它",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:finance:else",
          "keppAlive": true,
          "menuId": "774b4085-51d9-11ed-8418-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 2,
        "pathList": [
          2,
          0
        ]
      },
      {
        "path": "/finance/ysf",
        "name": "ysf",
        "addBtn": 0,
        "children": [
          {
            "path": "/finance/ysf/fincome",
            "name": "fincome",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/ysf/fincome/all",
                "name": "all",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "全部",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:all",
                  "keppAlive": true,
                  "menuId": "268339c4-5e4f-11ed-b0d2-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  0
                ]
              },
              {
                "path": "/finance/ysf/fincome/addincome",
                "name": "addincome",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "icon-pmback",
                  "title": "创建收款单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:addincome",
                  "keppAlive": true,
                  "menuId": "3ca4dfbd-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  1
                ]
              },
              {
                "path": "/finance/ysf/fincome/fcash",
                "name": "fcash",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "现付",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:fcash",
                  "keppAlive": true,
                  "menuId": "3ca93bf8-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  2
                ]
              },
              {
                "path": "/finance/ysf/fincome/fdeliver",
                "name": "fdeliver",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "提付",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:fdeliver",
                  "keppAlive": true,
                  "menuId": "3caac81c-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  3
                ]
              },
              {
                "path": "/finance/ysf/fincome/freceipt",
                "name": "freceipt",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "回单付",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:freceipt",
                  "keppAlive": true,
                  "menuId": "3cacf796-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 4,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  4
                ]
              },
              {
                "path": "/finance/ysf/fincome/fmonth",
                "name": "fmonth",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "月结",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:fmonth",
                  "keppAlive": true,
                  "menuId": "3cae7293-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 5,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  5
                ]
              },
              {
                "path": "/finance/ysf/fincome/fdeduct",
                "name": "fdeduct",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "货款扣",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:fdeduct",
                  "keppAlive": true,
                  "menuId": "3cafcb87-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 6,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  6
                ]
              },
              {
                "path": "/finance/ysf/fincome/fswitchreturn",
                "name": "fswitchreturn",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "返中转费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:fswitchreturn",
                  "keppAlive": true,
                  "menuId": "3cb1a31d-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 7,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  7
                ]
              },
              {
                "path": "/finance/ysf/fincome/finfo",
                "name": "finfo",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "信息费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:finfo",
                  "keppAlive": true,
                  "menuId": "3cb33a07-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 8,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  8
                ]
              },
              {
                "path": "/finance/ysf/fincome/fcarincome",
                "name": "fcarincome",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "出车收入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fincome:fcarincome",
                  "keppAlive": true,
                  "menuId": "3cb4d1de-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 9,
                "parentId": 0,
                "pathList": [
                  2,
                  1,
                  0,
                  9
                ]
              }
            ],
            "meta": {
              "icon": "icon-fincome",
              "title": "应收账款",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:ysf:fincome",
              "keppAlive": true,
              "menuId": "3a5583f8-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 1,
            "pathList": [
              2,
              1,
              0
            ]
          },
          {
            "path": "/finance/ysf/fpay",
            "name": "fpay",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/ysf/fpay/all",
                "name": "all",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "全部",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:all",
                  "keppAlive": true,
                  "menuId": "2685e390-5e4f-11ed-b0d2-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  0
                ]
              },
              {
                "path": "/finance/ysf/fpay/transportZDYField6",
                "name": "transportZDYField6",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "过磅费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField6",
                  "keppAlive": true,
                  "menuId": "3a0fb0e7-843b-2eea-90b3-17e4d05af7a7",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  1
                ]
              },
              {
                "path": "transportZDYField2",
                "name": "transportZDYField2",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "装货费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField2",
                  "keppAlive": true,
                  "menuId": "3a0fb0e8-29f5-24d4-2373-d37b86fbca5c",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  2
                ]
              },
              {
                "path": "/finance/ysf/fpay/transportZDYField3",
                "name": "transportZDYField3",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "其他费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField3",
                  "keppAlive": true,
                  "menuId": "3a0fb0e9-213c-2ef5-0c68-b3c4a2d5d594",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  3
                ]
              },
              {
                "path": "/finance/ysf/fpay/transportZDYField4",
                "name": "transportZDYField4",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "卸货费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField4",
                  "keppAlive": true,
                  "menuId": "3a0fb0e9-6f93-2a64-1be7-def9cbe2a34d",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 4,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  4
                ]
              },
              {
                "path": "/finance/ysf/fpay/addpay",
                "name": "addpay",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "icon-pmback",
                  "title": "创建付款单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:addpay",
                  "keppAlive": true,
                  "menuId": "3ca74782-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  5
                ]
              },
              {
                "path": "/finance/ysf/fpay/fswtotal",
                "name": "fswtotal",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "中转成本",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:fswtotal",
                  "keppAlive": true,
                  "menuId": "af9e8970-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 6,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  6
                ]
              },
              {
                "path": "/finance/ysf/fpay/fprepare",
                "name": "fprepare",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "预付司机",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:fprepare",
                  "keppAlive": true,
                  "menuId": "3cb735d4-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 7,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  7
                ]
              },
              {
                "path": "/finance/ysf/fpay/farrive",
                "name": "farrive",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "到付司机",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:farrive",
                  "keppAlive": true,
                  "menuId": "3cb8ca00-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 8,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  8
                ]
              },
              {
                "path": "/finance/ysf/fpay/fback",
                "name": "fback",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "回付司机",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:fback",
                  "keppAlive": true,
                  "menuId": "3cba323a-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 9,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  9
                ]
              },
              {
                "path": "/finance/ysf/fpay/foilcard",
                "name": "foilcard",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "油卡付司机",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:foilcard",
                  "keppAlive": true,
                  "menuId": "3cbbc9a9-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 10,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  10
                ]
              },
              {
                "path": "/finance/ysf/fpay/freturn",
                "name": "freturn",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "返款",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:freturn",
                  "keppAlive": true,
                  "menuId": "3cbd4150-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 11,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  11
                ]
              },
              {
                "path": "/finance/ysf/fpay/fdeliverycost",
                "name": "fdeliverycost",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "接货成本",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:fdeliverycost",
                  "keppAlive": true,
                  "menuId": "3cbeae02-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 12,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  12
                ]
              },
              {
                "path": "/finance/ysf/fpay/fadvance",
                "name": "fadvance",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "垫付",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:fadvance",
                  "keppAlive": true,
                  "menuId": "3cc05875-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 13,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  13
                ]
              },
              {
                "path": "/finance/ysf/fpay/ftotal",
                "name": "ftotal",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "送货成本",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:ftotal",
                  "keppAlive": true,
                  "menuId": "3cc1ccce-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 14,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  14
                ]
              },
              {
                "path": "/finance/ysf/fpay/fcarpay",
                "name": "fcarpay",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "出车费用",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:fcarpay",
                  "keppAlive": true,
                  "menuId": "3cc65035-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 15,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  15
                ]
              },
              {
                "path": "/finance/ysf/fpay/ftotalcost",
                "name": "ftotalcost",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "送出外发成本",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:ftotalcost",
                  "keppAlive": true,
                  "menuId": "3cc7b286-5c1d-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 16,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  16
                ]
              },
              {
                "path": "/finance/ysf/fpay/transportZDYField5",
                "name": "transportZDYField5",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "吊叉车费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField5",
                  "keppAlive": true,
                  "menuId": "3a0fb0e5-7d76-88b7-baaa-d2e3cb6b7425",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 17,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  17
                ]
              },
              {
                "path": "/finance/ysf/fpay/transportZDYField7",
                "name": "transportZDYField7",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "包装费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField7",
                  "keppAlive": true,
                  "menuId": "3a0fb0e6-8b90-7103-2ca9-db166f237c3d",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 18,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  18
                ]
              },
              {
                "path": "/finance/ysf/fpay/transportZDYField1",
                "name": "transportZDYField1",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "进仓费",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:ysf:fpay:transportZDYField1",
                  "keppAlive": true,
                  "menuId": "3a0fb0e7-34d3-b7c3-f32d-4f4d4a846264",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 19,
                "parentId": 1,
                "pathList": [
                  2,
                  1,
                  1,
                  19
                ]
              }
            ],
            "meta": {
              "icon": "icon-fpay",
              "title": "应付账款",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:ysf:fpay",
              "keppAlive": true,
              "menuId": "3a5722c7-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 1,
            "pathList": [
              2,
              1,
              1
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "应收/应付",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:finance:ysf",
          "keppAlive": true,
          "menuId": "8368bee8-5b5d-11ed-a951-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 1,
        "parentId": 2,
        "pathList": [
          2,
          1
        ]
      },
      {
        "path": "/finance/wldz",
        "name": "wldz",
        "addBtn": 0,
        "children": [
          {
            "path": "/finance/wldz/fshipper",
            "name": "fshipper",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/wldz/fshipper/fsptot",
                "name": "fsptot",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "发货客户汇总",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fshipper:fsptot",
                  "keppAlive": true,
                  "menuId": "33bf7c01-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  2,
                  2,
                  0,
                  0
                ]
              },
              {
                "path": "/finance/wldz/fshipper/fspdtl",
                "name": "fspdtl",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/wldz/fshipper/fspdtl/adddz",
                    "name": "adddz",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "创建对账单",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:wldz:fshipper:fspdtl:adddz",
                      "keppAlive": true,
                      "menuId": "5e87069d-5c20-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      2,
                      2,
                      0,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/finance/wldz/fshipper/fspdtl/daochu",
                    "name": "daochu",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:wldz:fshipper:fspdtl:daochu",
                      "keppAlive": true,
                      "menuId": "3a0f541c-a1f1-06af-802c-768de3cf0b3a",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      2,
                      2,
                      0,
                      1,
                      1
                    ]
                  },
                  {
                    "path": "/finance/wldz/fshipper/fspdtl/dayin",
                    "name": "dayin",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:wldz:fshipper:fspdtl:dayin",
                      "keppAlive": true,
                      "menuId": "3a0f541d-76df-513c-9f6e-19cfa4b044c6",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 1,
                    "pathList": [
                      2,
                      2,
                      0,
                      1,
                      2
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "发货客户明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fshipper:fspdtl",
                  "keppAlive": true,
                  "menuId": "33c23019-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  2,
                  2,
                  0,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-dz",
              "title": "发货客户对账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:wldz:fshipper",
              "keppAlive": true,
              "menuId": "3a58cd73-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 2,
            "pathList": [
              2,
              2,
              0
            ]
          },
          {
            "path": "/finance/wldz/freceiver",
            "name": "freceiver",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/wldz/freceiver/frcetot",
                "name": "frcetot",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "收货客户汇总",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:freceiver:frcetot",
                  "keppAlive": true,
                  "menuId": "33c39436-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  2,
                  2,
                  1,
                  0
                ]
              },
              {
                "path": "/finance/wldz/freceiver/frcedtl",
                "name": "frcedtl",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/wldz/freceiver/frcedtl/adddz",
                    "name": "adddz",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "创建对账单",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:wldz:freceiver:frcedtl:adddz",
                      "keppAlive": true,
                      "menuId": "5e8977ab-5c20-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      2,
                      2,
                      1,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "收货客户明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:freceiver:frcedtl",
                  "keppAlive": true,
                  "menuId": "33c546a9-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  2,
                  2,
                  1,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-dz",
              "title": "收货客户对账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:wldz:freceiver",
              "keppAlive": true,
              "menuId": "3a5afc15-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 2,
            "pathList": [
              2,
              2,
              1
            ]
          },
          {
            "path": "/finance/wldz/fcarrier",
            "name": "fcarrier",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/wldz/fcarrier/fcrtot",
                "name": "fcrtot",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "承运商汇总",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fcarrier:fcrtot",
                  "keppAlive": true,
                  "menuId": "33c68a1a-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  2,
                  2,
                  2,
                  0
                ]
              },
              {
                "path": "/finance/wldz/fcarrier/fcrdtl",
                "name": "fcrdtl",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/wldz/fcarrier/fcrdtl/adddz",
                    "name": "adddz",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "创建对账单",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:wldz:fcarrier:fcrdtl:adddz",
                      "keppAlive": true,
                      "menuId": "5e8aaca3-5c20-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      2,
                      2,
                      2,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "承运商明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fcarrier:fcrdtl",
                  "keppAlive": true,
                  "menuId": "33c82009-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  2,
                  2,
                  2,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-dz",
              "title": "承运商对账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:wldz:fcarrier",
              "keppAlive": true,
              "menuId": "3a5cfd7d-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 2,
            "pathList": [
              2,
              2,
              2
            ]
          },
          {
            "path": "/finance/wldz/fdriver",
            "name": "fdriver",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/wldz/fdriver/fdrtot",
                "name": "fdrtot",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "司机汇总",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fdriver:fdrtot",
                  "keppAlive": true,
                  "menuId": "33c9bcdf-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  2,
                  2,
                  3,
                  0
                ]
              },
              {
                "path": "/finance/wldz/fdriver/fdrdtl",
                "name": "fdrdtl",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/wldz/fdriver/fdrdtl/adddz",
                    "name": "adddz",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "创建对账单",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:wldz:fdriver:fdrdtl:adddz",
                      "keppAlive": true,
                      "menuId": "5e8c0157-5c20-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      2,
                      2,
                      3,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "司机明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fdriver:fdrdtl",
                  "keppAlive": true,
                  "menuId": "33cb3883-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  2,
                  2,
                  3,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-dz",
              "title": "司机对账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:wldz:fdriver",
              "keppAlive": true,
              "menuId": "3a5e8f15-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 2,
            "pathList": [
              2,
              2,
              3
            ]
          },
          {
            "path": "/finance/wldz/fgroup",
            "name": "fgroup",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/wldz/fgroup/fgpdtl/adddz",
                "name": "adddz",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "icon-pmback",
                  "title": "创建对账单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:wldz:fgroup:fgpdtl:adddz",
                  "keppAlive": true,
                  "menuId": "5e8dd934-5c20-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 4,
                "pathList": [
                  2,
                  2,
                  4,
                  0
                ]
              }
            ],
            "meta": {
              "icon": "icon-dz",
              "title": "网点对账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:wldz:fgroup",
              "keppAlive": true,
              "menuId": "3a6013d0-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 2,
            "pathList": [
              2,
              2,
              4
            ]
          },
          {
            "path": "/finance/wldz/fgrouptran",
            "name": "fgrouptran",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-dz",
              "title": "网点对账（车）",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:wldz:fgrouptran",
              "keppAlive": true,
              "menuId": "3a101e74-7204-dd30-493f-a3330cbf13f8",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 5,
            "parentId": 2,
            "pathList": [
              2,
              2,
              5
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "往来对账",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:finance:wldz",
          "keppAlive": true,
          "menuId": "836ac8fb-5b5d-11ed-a951-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 2,
        "parentId": 2,
        "pathList": [
          2,
          2
        ]
      },
      {
        "path": "/finance/bill",
        "name": "bill",
        "addBtn": 0,
        "children": [
          {
            "path": "/finance/bill/fdz",
            "name": "fdz",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/bill/fdz/fdztot",
                "name": "fdztot",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/bill/fdz/fdztot/del",
                    "name": "del",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "删除",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:del",
                      "keppAlive": true,
                      "menuId": "1b056320-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/finance/bill/fdz/fdztot/audit",
                    "name": "audit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:audit",
                      "keppAlive": true,
                      "menuId": "1b07d934-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/finance/bill/fdz/fdztot/faudit",
                    "name": "faudit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "反审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:faudit",
                      "keppAlive": true,
                      "menuId": "1b099294-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      2
                    ]
                  },
                  {
                    "path": "/finance/bill/fdz/fdztot/adds",
                    "name": "adds",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "确认收款",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:adds",
                      "keppAlive": true,
                      "menuId": "3a0fb7b4-971b-0aa5-046f-fbdea98b4566",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      3
                    ]
                  },
                  {
                    "path": "/finance/bill/fdz/fdztot/addf",
                    "name": "addf",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "确认付款",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:addf",
                      "keppAlive": true,
                      "menuId": "3a0fb7b5-5400-63df-10cc-197ac602002d",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 4,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      4
                    ]
                  },
                  {
                    "path": "/finance/bill/fdz/fdztot/daochu",
                    "name": "daochu",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:daochu",
                      "keppAlive": true,
                      "menuId": "3a0f3b35-9788-01e5-6a93-15727a4b2dd9",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 5,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      5
                    ]
                  },
                  {
                    "path": "/finance/bill/fdz/fdztot/dayin",
                    "name": "dayin",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fdz:fdztot:dayin",
                      "keppAlive": true,
                      "menuId": "3a0f3b3c-f87c-8459-39c1-b9ff459375ee",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 6,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      0,
                      0,
                      6
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "对账单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:bill:fdz:fdztot",
                  "keppAlive": true,
                  "menuId": "8c2d1157-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  2,
                  3,
                  0,
                  0
                ]
              },
              {
                "path": "/finance/bill/fdz/fdzdtl",
                "name": "fdzdtl",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "对账单明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:bill:fdz:fdzdtl",
                  "keppAlive": true,
                  "menuId": "8c2f92f7-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  2,
                  3,
                  0,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-dzbill",
              "title": "对账单",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:bill:fdz",
              "keppAlive": true,
              "menuId": "3a61e3bd-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 3,
            "pathList": [
              2,
              3,
              0
            ]
          },
          {
            "path": "/finance/bill/fjzd",
            "name": "fjzd",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/bill/fjzd/fjztot",
                "name": "fjztot",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/bill/fjz/fjztot/add",
                    "name": "add",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "新增",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:add",
                      "keppAlive": true,
                      "menuId": "1b0c846d-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/finance/bill/fjz/fjztot/del",
                    "name": "del",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "删除",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:del",
                      "keppAlive": true,
                      "menuId": "1b0f8411-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/finance/bill/fjz/fjztot/audit",
                    "name": "audit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:audit",
                      "keppAlive": true,
                      "menuId": "1b10d323-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      2
                    ]
                  },
                  {
                    "path": "/finance/bill/fjz/fjztot/faudit",
                    "name": "faudit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "反审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:faudit",
                      "keppAlive": true,
                      "menuId": "1b1245f6-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      3
                    ]
                  },
                  {
                    "path": "/finance/bill/fjz/fjztot/addsf",
                    "name": "addsf",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "创建收付款单",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:addsf",
                      "keppAlive": true,
                      "menuId": "1b169de8-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 4,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      4
                    ]
                  },
                  {
                    "path": "/finance/bill/fjz/fjztot/daochu",
                    "name": "daochu",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:daochu",
                      "keppAlive": true,
                      "menuId": "3a0f55df-5b7e-6f06-651d-bfe874505017",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 5,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      5
                    ]
                  },
                  {
                    "path": "/finance/bill/fjz/fjztot/dayin",
                    "name": "dayin",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:bill:fjz:fjztot:dayin",
                      "keppAlive": true,
                      "menuId": "3a0f55e0-61e0-da0f-e59c-6ad27cbabb90",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 6,
                    "parentId": 0,
                    "pathList": [
                      2,
                      3,
                      1,
                      0,
                      6
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "交账单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:bill:fjzd:fjztot",
                  "keppAlive": true,
                  "menuId": "8c3175ef-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  2,
                  3,
                  1,
                  0
                ]
              },
              {
                "path": "/finance/bill/fjzd/fjzdtl",
                "name": "fjzdtl",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "交账单明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:bill:fjzd:fjzdtl",
                  "keppAlive": true,
                  "menuId": "8c3313d3-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  2,
                  3,
                  1,
                  1
                ]
              },
              {
                "path": "/finance/bill/fjzd/fjzadd",
                "name": "fjzadd",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "创建交账单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:bill:fjzd:fjzadd",
                  "keppAlive": true,
                  "menuId": "8c348207-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  2,
                  3,
                  1,
                  2
                ]
              },
              {
                "path": "/finance/bill/fjzd/fjzaddcar",
                "name": "fjzaddcar",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "创建交账单按车",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:bill:fjzd:fjzaddcar",
                  "keppAlive": true,
                  "menuId": "3a121c2f-6736-c38e-9e60-fed9be22d469",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  2,
                  3,
                  1,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-fkbill",
              "title": "交账单",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:bill:fjzd",
              "keppAlive": true,
              "menuId": "3a6357c3-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 3,
            "pathList": [
              2,
              3,
              1
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "账单",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:finance:bill",
          "keppAlive": true,
          "menuId": "836c35e4-5b5d-11ed-a951-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 3,
        "parentId": 2,
        "pathList": [
          2,
          3
        ]
      },
      {
        "path": "/finance/sbill",
        "name": "sbill",
        "addBtn": 0,
        "children": [
          {
            "path": "/finance/sbill/fsk",
            "name": "fsk",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/sbill/fsk/fsktot",
                "name": "fsktot",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/sbill/fsk/fsktot/del",
                    "name": "del",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "删除",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fsk:fsktot:del",
                      "keppAlive": true,
                      "menuId": "1b1820f4-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      0,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/finance/sbill/fsk/fsktot/audit",
                    "name": "audit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fsk:fsktot:audit",
                      "keppAlive": true,
                      "menuId": "1b19a7be-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      0,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/finance/sbill/fsk/fsktot/faudit",
                    "name": "faudit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "反审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fsk:fsktot:faudit",
                      "keppAlive": true,
                      "menuId": "1b1aeebe-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      0,
                      0,
                      2
                    ]
                  },
                  {
                    "path": "/finance/sbill/fsk/fsktot/addjs",
                    "name": "addjs",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "收款结算",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fsk:fsktot:addjs",
                      "keppAlive": true,
                      "menuId": "1b1c5a81-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      0,
                      0,
                      3
                    ]
                  },
                  {
                    "path": "/finance/sbill/fsk/fsktot/daochu",
                    "name": "daochu",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fsk:fsktot:daochu",
                      "keppAlive": true,
                      "menuId": "3a0f5aff-ebe9-b411-8e55-fc93cb0c0fb0",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 4,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      0,
                      0,
                      4
                    ]
                  },
                  {
                    "path": "/finance/sbill/fsk/fsktot/dayin",
                    "name": "dayin",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fsk:fsktot:dayin",
                      "keppAlive": true,
                      "menuId": "3a0f5b00-4f47-ce0d-6eb6-8b2525a294ca",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 5,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      0,
                      0,
                      5
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "收款单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:sbill:fsk:fsktot",
                  "keppAlive": true,
                  "menuId": "8c35db31-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  2,
                  4,
                  0,
                  0
                ]
              },
              {
                "path": "/finance/sbill/fsk/fskdtl",
                "name": "fskdtl",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "收款单明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:sbill:fsk:fskdtl",
                  "keppAlive": true,
                  "menuId": "8c37722e-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  2,
                  4,
                  0,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-pmaccount",
              "title": "收款单",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:sbill:fsk",
              "keppAlive": true,
              "menuId": "3a6525dc-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 4,
            "pathList": [
              2,
              4,
              0
            ]
          },
          {
            "path": "/finance/sbill/ffk",
            "name": "ffk",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/sbill/ffk/ffktot",
                "name": "ffktot",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/sbill/ffk/ffktot/del",
                    "name": "del",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "删除",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:ffk:ffktot:del",
                      "keppAlive": true,
                      "menuId": "1b1dd8ea-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      1,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/finance/sbill/ffk/ffktot/audit",
                    "name": "audit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:ffk:ffktot:audit",
                      "keppAlive": true,
                      "menuId": "1b1f7f53-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      1,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/finance/sbill/ffk/ffktot/faudit",
                    "name": "faudit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "反审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:ffk:ffktot:faudit",
                      "keppAlive": true,
                      "menuId": "1b210648-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      1,
                      0,
                      2
                    ]
                  },
                  {
                    "path": "/finance/sbill/ffk/ffktot/addjs",
                    "name": "addjs",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "付款结算",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:ffk:ffktot:addjs",
                      "keppAlive": true,
                      "menuId": "1b22456a-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      1,
                      0,
                      3
                    ]
                  },
                  {
                    "path": "/finance/sbill/ffk/ffktot/daochu",
                    "name": "daochu",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:ffk:ffktot:daochu",
                      "keppAlive": true,
                      "menuId": "3a0f68d1-faf5-d477-619c-cc6e3793ecea",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 4,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      1,
                      0,
                      4
                    ]
                  },
                  {
                    "path": "/finance/sbill/ffk/ffktot/dayin",
                    "name": "dayin",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:ffk:ffktot:dayin",
                      "keppAlive": true,
                      "menuId": "3a0f68d2-67a8-fc83-3dc0-3b48a09d61a6",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 5,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      1,
                      0,
                      5
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "付款单",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:sbill:ffk:ffktot",
                  "keppAlive": true,
                  "menuId": "8c38e9d6-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  2,
                  4,
                  1,
                  0
                ]
              },
              {
                "path": "/finance/sbill/ffk/ffkdtl",
                "name": "ffkdtl",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "付款单明细",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:sbill:ffk:ffkdtl",
                  "keppAlive": true,
                  "menuId": "8c3a6612-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  2,
                  4,
                  1,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-fkbill",
              "title": "付款单",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:sbill:ffk",
              "keppAlive": true,
              "menuId": "3a66f38d-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 4,
            "pathList": [
              2,
              4,
              1
            ]
          },
          {
            "path": "/finance/sbill/fhk",
            "name": "fhk",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-fkbill",
              "title": "收支明细",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:sbill:ffk",
              "keppAlive": true,
              "menuId": "3a0feaa8-7c60-8cd3-cfc7-6ca1b91f150a",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 4,
            "pathList": [
              2,
              4,
              2
            ]
          },
          {
            "path": "/finance/sbill/fund",
            "name": "fund",
            "addBtn": 0,
            "children": [
              {
                "path": "/finance/sbill/fund/fzjtot",
                "name": "fzjtot",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/finance/sbill/fund/fzjtot/add",
                    "name": "add",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "新增",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:add",
                      "keppAlive": true,
                      "menuId": "1b23ad50-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/upd",
                    "name": "upd",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:upd",
                      "keppAlive": true,
                      "menuId": "1b252cb0-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/del",
                    "name": "del",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "作废",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:del",
                      "keppAlive": true,
                      "menuId": "1b26c473-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      2
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/audit",
                    "name": "audit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:audit",
                      "keppAlive": true,
                      "menuId": "1b281bfd-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      3
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/faudit",
                    "name": "faudit",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "反审核",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:faudit",
                      "keppAlive": true,
                      "menuId": "1b296e2a-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 4,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      4
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/jz",
                    "name": "jz",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "结账",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:jz",
                      "keppAlive": true,
                      "menuId": "1b2ae5fa-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 5,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      5
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/fjz",
                    "name": "fjz",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "icon-pmback",
                      "title": "反结账",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:fjz",
                      "keppAlive": true,
                      "menuId": "1b2c54e4-5c23-11ed-9917-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 6,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      6
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/daochu",
                    "name": "daochu",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "导出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:daochu",
                      "keppAlive": true,
                      "menuId": "3a0f5abe-4b61-ccea-81ba-200bc4a3ac2b",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 7,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      7
                    ]
                  },
                  {
                    "path": "/finance/sbill/fund/fzjtot/dayin",
                    "name": "dayin",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "",
                      "title": "打印",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:finance:sbill:fund:fzjtot:dayin",
                      "keppAlive": true,
                      "menuId": "3a0f5abe-e7bc-bfd9-b5d3-475919207563",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 8,
                    "parentId": 0,
                    "pathList": [
                      2,
                      4,
                      3,
                      0,
                      8
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "资金总账",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:sbill:fund:fzjtot",
                  "keppAlive": true,
                  "menuId": "8c3c020d-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  2,
                  4,
                  3,
                  0
                ]
              },
              {
                "path": "/finance/sbill/fund/fzjdtl",
                "name": "fzjdtl",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "资金明细账",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:finance:sbill:fund:fzjdtl",
                  "keppAlive": true,
                  "menuId": "8c3d749d-5c21-11ed-9917-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  2,
                  4,
                  3,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-zjbill",
              "title": "资金账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:finance:sbill:fund",
              "keppAlive": true,
              "menuId": "3a68beb0-5b5f-11ed-a951-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 4,
            "pathList": [
              2,
              4,
              3
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "查账",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:finance:sbill",
          "keppAlive": true,
          "menuId": "836dcbee-5b5d-11ed-a951-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 4,
        "parentId": 2,
        "pathList": [
          2,
          4
        ]
      }
    ],
    "meta": {
      "icon": "icon-financeCenter",
      "title": "财务中心",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:finance",
      "keppAlive": true,
      "menuId": "3a02c237-d60a-7104-470a-b71cc680703c",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 2,
    "parentId": null,
    "pathList": [
      2
    ]
  },
  {
    "path": "/payment",
    "name": "payment",
    "addBtn": 0,
    "children": [
      {
        "path": "/payment/process",
        "name": "process",
        "addBtn": 0,
        "children": [
          {
            "path": "/payment/process/pmback",
            "name": "pmback",
            "addBtn": 0,
            "children": [
              {
                "path": "/payment/process/pmback/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增货款收回",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmback:add",
                  "keppAlive": true,
                  "menuId": "ee14d09c-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  3,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/payment/process/pmback/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/payment/process/pmback/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消货款收回",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:payment:process:pmback:record:cancel",
                      "keppAlive": true,
                      "menuId": "10770f97-19ef-11ed-b9b8-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      3,
                      0,
                      0,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "货款收回记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmback:record",
                  "keppAlive": true,
                  "menuId": "ee1650e2-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  3,
                  0,
                  0,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-pmback",
              "title": "货款收回",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:process:pmback",
              "keppAlive": true,
              "menuId": "e5e33408-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              3,
              0,
              0
            ]
          },
          {
            "path": "/payment/process/pmremit",
            "name": "pmremit",
            "addBtn": 0,
            "children": [
              {
                "path": "/payment/process/pmremit/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增货款汇出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmremit:add",
                  "keppAlive": true,
                  "menuId": "ee1b9f48-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  3,
                  0,
                  1,
                  0
                ]
              },
              {
                "path": "/payment/process/pmremit/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/payment/process/pmremit/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消货款汇出",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:payment:process:pmremit:record:cancel",
                      "keppAlive": true,
                      "menuId": "107890fa-19ef-11ed-b9b8-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      3,
                      0,
                      1,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "货款汇出记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmremit:record",
                  "keppAlive": true,
                  "menuId": "ee1d2054-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  3,
                  0,
                  1,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-pmremit",
              "title": "货款汇出",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:process:pmremit",
              "keppAlive": true,
              "menuId": "e5e3351b-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              3,
              0,
              1
            ]
          },
          {
            "path": "/payment/process/pmaccount",
            "name": "pmaccount",
            "addBtn": 0,
            "children": [
              {
                "path": "/payment/process/pmaccount/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增货款到账",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmaccount:add",
                  "keppAlive": true,
                  "menuId": "ee1ec46a-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  3,
                  0,
                  2,
                  0
                ]
              },
              {
                "path": "/payment/process/pmaccount/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/payment/process/pmaccount/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消货款到账",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:payment:process:pmaccount:record:cancel",
                      "keppAlive": true,
                      "menuId": "1079f9e8-19ef-11ed-b9b8-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      3,
                      0,
                      2,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "货款到账记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmaccount:record",
                  "keppAlive": true,
                  "menuId": "ee209cee-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  3,
                  0,
                  2,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-pmaccount",
              "title": "货款到账",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:process:pmaccount",
              "keppAlive": true,
              "menuId": "e5e335e6-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 0,
            "pathList": [
              3,
              0,
              2
            ]
          },
          {
            "path": "/payment/process/pmgrant",
            "name": "pmgrant",
            "addBtn": 0,
            "children": [
              {
                "path": "/payment/process/pmgrant/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增货款发放",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmgrant:add",
                  "keppAlive": true,
                  "menuId": "ee225273-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  3,
                  0,
                  3,
                  0
                ]
              },
              {
                "path": "/payment/process/pmgrant/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/payment/process/pmgrant/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消货款发放",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:payment:process:pmgrant:record:cancel",
                      "keppAlive": true,
                      "menuId": "107bba75-19ef-11ed-b9b8-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      3,
                      0,
                      3,
                      1,
                      0
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "货款发放记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmgrant:record",
                  "keppAlive": true,
                  "menuId": "ee2432e5-19ee-11ed-b9b8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  3,
                  0,
                  3,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-pmgrant",
              "title": "货款发放",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:process:pmgrant",
              "keppAlive": true,
              "menuId": "e5e336d3-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 0,
            "pathList": [
              3,
              0,
              3
            ]
          },
          {
            "path": "/payment/process/pmlist",
            "name": "pmlist",
            "addBtn": 0,
            "children": [
              {
                "path": "/payment/process/pmlist/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:payment:process:pmlist:export",
                  "keppAlive": true,
                  "menuId": "34f178ec-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 4,
                "pathList": [
                  3,
                  0,
                  4,
                  0
                ]
              }
            ],
            "meta": {
              "icon": "icon-pmlist",
              "title": "货款总表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:process:pmlist",
              "keppAlive": true,
              "menuId": "e5e32d02-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 0,
            "pathList": [
              3,
              0,
              4
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "货款流程",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:payment:process",
          "keppAlive": true,
          "menuId": "3a046d1c-c0ba-b808-a77b-dd33f2ce2baa",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 3,
        "pathList": [
          3,
          0
        ]
      },
      {
        "path": "/payment/operate",
        "name": "operate",
        "addBtn": 0,
        "children": [
          {
            "path": "/payment/operate/pmchange",
            "name": "pmchange",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-pmchange",
              "title": "货款变更",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:operate:pmchange",
              "keppAlive": true,
              "menuId": "e5e3377e-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 1,
            "pathList": [
              3,
              1,
              0
            ]
          },
          {
            "path": "/payment/operate/recovery",
            "name": "recovery",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-recovery",
              "title": "货款恢复",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:operate:recovery",
              "keppAlive": true,
              "menuId": "e5e33824-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 1,
            "pathList": [
              3,
              1,
              1
            ]
          },
          {
            "path": "/payment/operate/pmcancel",
            "name": "pmcancel",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-cancel",
              "title": "货款取消",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:payment:operate:pmcancel",
              "keppAlive": true,
              "menuId": "e5e339ec-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 1,
            "pathList": [
              3,
              1,
              2
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "货款操作",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:payment:operate",
          "keppAlive": true,
          "menuId": "3a046d1d-60ef-7eaf-9f86-6bbcc6aaafb5",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 1,
        "parentId": 3,
        "pathList": [
          3,
          1
        ]
      }
    ],
    "meta": {
      "icon": "icon-paymentCenter",
      "title": "货款中心",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:payment",
      "keppAlive": true,
      "menuId": "3a02c238-9413-194b-65ce-a9059a14cb04",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 3,
    "parentId": null,
    "pathList": [
      3
    ]
  },
  {
    "path": "/receipt",
    "name": "receipt",
    "addBtn": 0,
    "children": [
      {
        "path": "/receipt/process",
        "name": "process",
        "addBtn": 0,
        "children": [
          {
            "path": "/receipt/process/rcpsign",
            "name": "rcpsign",
            "addBtn": 0,
            "children": [
              {
                "path": "/receipt/process/rcpsign/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增回单签收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpsign:add",
                  "keppAlive": true,
                  "menuId": "a77ba0fd-13df-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  4,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/receipt/process/rcpsign/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/receipt/process/rcpsign/record/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpsign:record:update",
                      "keppAlive": true,
                      "menuId": "352c1305-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      0,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/receipt/process/rcpsign/record/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消签收",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpsign:record:cancel",
                      "keppAlive": true,
                      "menuId": "352d25ef-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      0,
                      1,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "回单签收记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpsign:record",
                  "keppAlive": true,
                  "menuId": "a77e2e4e-13df-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  4,
                  0,
                  0,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-sign2",
              "title": "回单签收",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:receipt:process:rcpsign",
              "keppAlive": true,
              "menuId": "e5e33b17-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              4,
              0,
              0
            ]
          },
          {
            "path": "/receipt/process/rcpback",
            "name": "rcpback",
            "addBtn": 0,
            "children": [
              {
                "path": "/receipt/process/rcpback/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增回单寄回",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpback:add",
                  "keppAlive": true,
                  "menuId": "89a1d12e-13e6-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  4,
                  0,
                  1,
                  0
                ]
              },
              {
                "path": "/receipt/process/rcpback/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/receipt/process/rcpback/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpback:update",
                      "keppAlive": true,
                      "menuId": "3530fac5-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      1,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/receipt/process/rcpback/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消寄回",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpback:cancel",
                      "keppAlive": true,
                      "menuId": "35321674-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      1,
                      1,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "回单寄回记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpback:record",
                  "keppAlive": true,
                  "menuId": "89a34aa9-13e6-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  4,
                  0,
                  1,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-mail",
              "title": "回单寄回",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:receipt:process:rcpback",
              "keppAlive": true,
              "menuId": "e5e33b9b-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              4,
              0,
              1
            ]
          },
          {
            "path": "/receipt/process/rcpreceive",
            "name": "rcpreceive",
            "addBtn": 0,
            "children": [
              {
                "path": "/receipt/process/rcpreceive/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增回单接收",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpreceive:add",
                  "keppAlive": true,
                  "menuId": "899b2702-13e6-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  4,
                  0,
                  2,
                  0
                ]
              },
              {
                "path": "/receipt/process/rcpreceive/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/receipt/process/rcpreceive/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpreceive:update",
                      "keppAlive": true,
                      "menuId": "3535fdb4-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      2,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/receipt/process/rcpreceive/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消接收",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpreceive:cancel",
                      "keppAlive": true,
                      "menuId": "35372958-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      2,
                      1,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "回单接收记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpreceive:record",
                  "keppAlive": true,
                  "menuId": "899d6e40-13e6-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  4,
                  0,
                  2,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-receive",
              "title": "回单接收",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:receipt:process:rcpreceive",
              "keppAlive": true,
              "menuId": "e5e33c76-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 0,
            "pathList": [
              4,
              0,
              2
            ]
          },
          {
            "path": "/receipt/process/rcpfactory",
            "name": "rcpfactory",
            "addBtn": 0,
            "children": [
              {
                "path": "/receipt/process/rcpfactory/add",
                "name": "add",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "新增回单返厂",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpfactory:add",
                  "keppAlive": true,
                  "menuId": "899e9b1d-13e6-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  4,
                  0,
                  3,
                  0
                ]
              },
              {
                "path": "/receipt/process/rcpfactory/record",
                "name": "record",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/receipt/process/rcpfactory/update",
                    "name": "update",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Edit",
                      "title": "修改",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpfactory:update",
                      "keppAlive": true,
                      "menuId": "353afda6-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      3,
                      1,
                      0
                    ]
                  },
                  {
                    "path": "/receipt/process/rcpfactory/cancel",
                    "name": "cancel",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "取消返厂",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:receipt:process:rcpfactory:cancel",
                      "keppAlive": true,
                      "menuId": "353c1f12-eb80-11ec-851e-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 1,
                    "pathList": [
                      4,
                      0,
                      3,
                      1,
                      1
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "回单返厂记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcpfactory:record",
                  "keppAlive": true,
                  "menuId": "89a07a1c-13e6-11ed-b687-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  4,
                  0,
                  3,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-factory",
              "title": "回单返厂",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:receipt:process:rcpfactory",
              "keppAlive": true,
              "menuId": "e5e33d25-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 0,
            "pathList": [
              4,
              0,
              3
            ]
          },
          {
            "path": "/receipt/process/rcplist",
            "name": "rcplist",
            "addBtn": 0,
            "children": [
              {
                "path": "/receipt/process/rcplist/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:receipt:process:rcplist:export",
                  "keppAlive": true,
                  "menuId": "35272909-eb80-11ec-851e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 4,
                "pathList": [
                  4,
                  0,
                  4,
                  0
                ]
              }
            ],
            "meta": {
              "icon": "icon-receipt2",
              "title": "回单总表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:receipt:process:rcplist",
              "keppAlive": true,
              "menuId": "e5e33a83-eaec-11ec-8634-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 0,
            "pathList": [
              4,
              0,
              4
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "回单流程",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:receipt:process",
          "keppAlive": true,
          "menuId": "3a046d1e-1d30-d63c-56e1-4430020d116d",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 4,
        "pathList": [
          4,
          0
        ]
      }
    ],
    "meta": {
      "icon": "icon-receiptManage",
      "title": "回单管理",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:receipt",
      "keppAlive": true,
      "menuId": "3a02c23a-887b-111d-0e92-93c1bb13783d",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 4,
    "parentId": null,
    "pathList": [
      4
    ]
  },
  {
    "path": "/customer",
    "name": "customer",
    "addBtn": 0,
    "children": [
      {
        "path": "/customer/custom",
        "name": "custom",
        "addBtn": 0,
        "children": [
          {
            "path": "/customer/shipper",
            "name": "shipper",
            "addBtn": 1,
            "children": [
              {
                "path": "/customer/shipper/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:shipper:export",
                  "keppAlive": true,
                  "menuId": "89b79e02-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  5,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/customer/shipper/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:shipper:insert",
                  "keppAlive": true,
                  "menuId": "89b9d3e5-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  5,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/customer/shipper/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:shipper:update",
                  "keppAlive": true,
                  "menuId": "89bb9ef8-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  5,
                  0,
                  0,
                  2
                ]
              },
              {
                "path": "/customer/shipper/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:shipper:delete",
                  "keppAlive": true,
                  "menuId": "89bcca8f-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  5,
                  0,
                  0,
                  3
                ]
              },
              {
                "path": "/customer/shipper/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Upload",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:shipper:import",
                  "keppAlive": true,
                  "menuId": "8dbc3610-4f89-11ed-b87e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 0,
                "pathList": [
                  5,
                  0,
                  0,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-customer",
              "title": "发货客户",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:customer:shipper",
              "keppAlive": true,
              "menuId": "3a046d1e-f82f-6ee9-0687-05b57680c59d",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              5,
              0,
              0
            ]
          },
          {
            "path": "/customer/receiver",
            "name": "receiver",
            "addBtn": 1,
            "children": [
              {
                "path": "/customer/receiver/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:receiver:export",
                  "keppAlive": true,
                  "menuId": "89be5bdd-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  5,
                  0,
                  1,
                  0
                ]
              },
              {
                "path": "/customer/receiver/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:receiver:insert",
                  "keppAlive": true,
                  "menuId": "89bfdc16-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  5,
                  0,
                  1,
                  1
                ]
              },
              {
                "path": "/customer/receiver/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:receiver:update",
                  "keppAlive": true,
                  "menuId": "89c106be-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  5,
                  0,
                  1,
                  2
                ]
              },
              {
                "path": "/customer/receiver/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:receiver:delete",
                  "keppAlive": true,
                  "menuId": "89c2686d-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  5,
                  0,
                  1,
                  3
                ]
              },
              {
                "path": "/customer/receiver/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Upload",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:receiver:import",
                  "keppAlive": true,
                  "menuId": "8dbc3b33-4f89-11ed-b87e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 1,
                "pathList": [
                  5,
                  0,
                  1,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-receiver",
              "title": "收货客户",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:customer:receiver",
              "keppAlive": true,
              "menuId": "3a046d1f-32b7-0f9a-7b31-068299eba4ea",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              5,
              0,
              1
            ]
          },
          {
            "path": "/customer/carrier",
            "name": "carrier",
            "addBtn": 1,
            "children": [
              {
                "path": "/customer/carrier/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:carrier:export",
                  "keppAlive": true,
                  "menuId": "89c47a0c-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  5,
                  0,
                  2,
                  0
                ]
              },
              {
                "path": "/customer/carrier/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:carrier:insert",
                  "keppAlive": true,
                  "menuId": "89c5e0cf-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  5,
                  0,
                  2,
                  1
                ]
              },
              {
                "path": "/customer/carrier/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:carrier:update",
                  "keppAlive": true,
                  "menuId": "89c72c7d-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 2,
                "pathList": [
                  5,
                  0,
                  2,
                  2
                ]
              },
              {
                "path": "/customer/carrier/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:carrier:delete",
                  "keppAlive": true,
                  "menuId": "89c86829-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 2,
                "pathList": [
                  5,
                  0,
                  2,
                  3
                ]
              },
              {
                "path": "/customer/carrier/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Upload",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:customer:carrier:import",
                  "keppAlive": true,
                  "menuId": "8dbc3c4d-4f89-11ed-b87e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 2,
                "pathList": [
                  5,
                  0,
                  2,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-home",
              "title": "承运商",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:customer:carrier",
              "keppAlive": true,
              "menuId": "3a046d1f-6f1f-4bed-bd51-4ced38894ad9",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 0,
            "pathList": [
              5,
              0,
              2
            ]
          }
        ],
        "meta": {
          "icon": "#",
          "title": "客户管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:customer:custom",
          "keppAlive": true,
          "menuId": "77ff5e71-eaea-11ec-8634-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 5,
        "pathList": [
          5,
          0
        ]
      }
    ],
    "meta": {
      "icon": "icon-customerManage",
      "title": "客户档案",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:customer",
      "keppAlive": true,
      "menuId": "3a02c23b-abff-89e5-dbc3-560cc66f7e3b",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 5,
    "parentId": null,
    "pathList": [
      5
    ]
  },
  {
    "path": "/car",
    "name": "car",
    "addBtn": 0,
    "children": [
      {
        "path": "/car/carManage",
        "name": "carManage",
        "addBtn": 0,
        "children": [
          {
            "path": "/car/car",
            "name": "car",
            "addBtn": 0,
            "children": [
              {
                "path": "/car/car/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:car:export",
                  "keppAlive": true,
                  "menuId": "89c9fb9e-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  6,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/car/car/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:car:insert",
                  "keppAlive": true,
                  "menuId": "89cb7517-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  6,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/car/car/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:car:update",
                  "keppAlive": true,
                  "menuId": "89ccbd60-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  6,
                  0,
                  0,
                  2
                ]
              },
              {
                "path": "/car/car/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:car:delete",
                  "keppAlive": true,
                  "menuId": "89ce6314-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  6,
                  0,
                  0,
                  3
                ]
              },
              {
                "path": "/car/car/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Upload",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:car:import",
                  "keppAlive": true,
                  "menuId": "8dbc3d3b-4f89-11ed-b87e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 0,
                "pathList": [
                  6,
                  0,
                  0,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-car3",
              "title": "车辆档案",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:car:car",
              "keppAlive": true,
              "menuId": "3a046d20-99d0-f894-e727-ac9d2ff67d56",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              6,
              0,
              0
            ]
          },
          {
            "path": "/car/driver",
            "name": "driver",
            "addBtn": 1,
            "children": [
              {
                "path": "/car/driver/export",
                "name": "export",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "导出",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:driver:export",
                  "keppAlive": true,
                  "menuId": "89d009c9-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  6,
                  0,
                  1,
                  0
                ]
              },
              {
                "path": "/car/driver/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:driver:insert",
                  "keppAlive": true,
                  "menuId": "89d1dfb1-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  6,
                  0,
                  1,
                  1
                ]
              },
              {
                "path": "/car/driver/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:driver:update",
                  "keppAlive": true,
                  "menuId": "89d33dc5-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  6,
                  0,
                  1,
                  2
                ]
              },
              {
                "path": "/car/driver/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:driver:delete",
                  "keppAlive": true,
                  "menuId": "89d489bc-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  6,
                  0,
                  1,
                  3
                ]
              },
              {
                "path": "/car/driver/import",
                "name": "import",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Upload",
                  "title": "批量导入",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:car:driver:import",
                  "keppAlive": true,
                  "menuId": "8dbc4056-4f89-11ed-b87e-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 1,
                "pathList": [
                  6,
                  0,
                  1,
                  4
                ]
              }
            ],
            "meta": {
              "icon": "icon-driver",
              "title": "司机档案",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:car:driver",
              "keppAlive": true,
              "menuId": "3a046d20-ce1f-c7fe-7087-7550fbd42f5e",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              6,
              0,
              1
            ]
          }
        ],
        "meta": {
          "icon": "#",
          "title": "车辆管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:car:carManage",
          "keppAlive": true,
          "menuId": "77ff64b4-eaea-11ec-8634-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 6,
        "pathList": [
          6,
          0
        ]
      }
    ],
    "meta": {
      "icon": "icon-carManage",
      "title": "车辆档案",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:car",
      "keppAlive": true,
      "menuId": "3a02c23c-2490-a354-8b41-edd3de1c952d",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 6,
    "parentId": null,
    "pathList": [
      6
    ]
  },
  {
    "path": "/report",
    "name": "report",
    "addBtn": 0,
    "children": [
      {
        "path": "/report/finreport",
        "name": "finreport",
        "addBtn": 0,
        "children": [
          {
            "path": "/report/finreport/transportlirun",
            "name": "transportlirun",
            "addBtn": 0,
            "children": [
              {
                "path": "/report/finreport/transportlirun/iteminit   ",
                "name": "iteminit",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "#",
                  "title": "更新",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "xunyun:report:finreport:transportlirun:iteminit",
                  "keppAlive": true,
                  "menuId": "3a0b81fe-f546-83b1-0e70-b02b1bd39ce2",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  7,
                  0,
                  1,
                  0
                ]
              }
            ],
            "meta": {
              "icon": "icon-dz",
              "title": "单车利润",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:transportlirun",
              "keppAlive": true,
              "menuId": "a072bdcb-f887-11ed-82a2-b8cef6825032",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              7,
              0,
              1
            ]
          },
          {
            "path": "/report/finreport/singleOrderLiRun",
            "name": "singleOrderLiRun",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "运单综合数据",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:singleOrderLiRun",
              "keppAlive": true,
              "menuId": "3a0b8292-4219-07f4-3f88-ba6fbaa9f4d9",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 0,
            "pathList": [
              7,
              0,
              2
            ]
          },
          {
            "path": "/report/finreport/customerRanking",
            "name": "customerRanking",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "客户排名分析",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:customerRanking",
              "keppAlive": true,
              "menuId": "3a2233cd-c1bf-ebdc-1b73-6e1141bda821",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 0,
            "pathList": [
              7,
              0,
              3
            ]
          },
          {
            "path": "/report/finreport/staticShipOrderAnalysis",
            "name": "staticShipOrderAnalysis",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "回单分析",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:/report:finreport:staticShipOrderAnalysis",
              "keppAlive": true,
              "menuId": "3a2248e9-4ab8-d3c9-d68f-5b89bf733c9e",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 0,
            "pathList": [
              7,
              0,
              4
            ]
          },
          {
            "path": "/report/finreport/dailySalesReport",
            "name": "dailySalesReport",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "营业额日报表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:dailySalesReport",
              "keppAlive": true,
              "menuId": "3a224cd2-7898-ec6f-ab99-db4b07a13003",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 5,
            "parentId": 0,
            "pathList": [
              7,
              0,
              5
            ]
          },
          {
            "path": "/report/finreport/salesSummary",
            "name": "salesSummary",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "营业额汇总表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:salesSummary",
              "keppAlive": true,
              "menuId": "3a22581f-86d8-8ecd-d779-c35915047868",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 6,
            "parentId": 0,
            "pathList": [
              7,
              0,
              6
            ]
          },
          {
            "path": "/report/finreport/transitFreightStatistics",
            "name": "transitFreightStatistics",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "中转运费统计",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:transitFreightStatistics",
              "keppAlive": true,
              "menuId": "3a227bd1-b46c-627b-715b-be7ea08771c6",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 7,
            "parentId": 0,
            "pathList": [
              7,
              0,
              7
            ]
          },
          {
            "path": "/report/finreport/cashDailyReport",
            "name": "cashDailyReport",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "现金日报表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:cashDailyReport",
              "keppAlive": true,
              "menuId": "3a227c3e-f13c-1e29-9f7f-39681dbe2d7f",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 8,
            "parentId": 0,
            "pathList": [
              7,
              0,
              8
            ]
          },
          {
            "path": "/report/finreport/branchGrossProfit",
            "name": "branchGrossProfit",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "网点毛利表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:branchGrossProfit",
              "keppAlive": true,
              "menuId": "3a229b1a-c0e6-3335-6406-e2597d577f98",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 9,
            "parentId": 0,
            "pathList": [
              7,
              0,
              9
            ]
          },
          {
            "path": "/report/finreport/accountsReceivableOverdue",
            "name": "accountsReceivableOverdue",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "应收账款逾期分析表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:accountsReceivableOverdue",
              "keppAlive": true,
              "menuId": "3a23022f-a3ea-5422-f581-072f88adcade",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 10,
            "parentId": 0,
            "pathList": [
              7,
              0,
              10
            ]
          },
          {
            "path": "/report/finreport/accountsReceivableAging",
            "name": "accountsReceivableAging",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "应收账龄分析表",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:accountsReceivableAging",
              "keppAlive": true,
              "menuId": "3a230c84-47e3-a788-f5fe-4f9726fd5450",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 11,
            "parentId": 0,
            "pathList": [
              7,
              0,
              11
            ]
          },
          {
            "path": "/report/finreport/staticKeHuLiRunSortRsp",
            "name": "staticKeHuLiRunSortRsp",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-order",
              "title": "客户利润排名分析",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "xunyun:report:finreport:singleOrderLiRun",
              "keppAlive": true,
              "menuId": "3a23b5ef-384c-99cf-3eb2-223fa46fc971",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 12,
            "parentId": 0,
            "pathList": [
              7,
              0,
              12
            ]
          }
        ],
        "meta": {
          "icon": "#",
          "title": "财务报表",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "xunyun:report:finreport",
          "keppAlive": true,
          "menuId": "608aec5c-f562-11ed-82a2-b8cef6825032",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 7,
        "pathList": [
          7,
          0
        ]
      }
    ],
    "meta": {
      "icon": "icon-reportCenter",
      "title": "报表中心",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:report",
      "keppAlive": true,
      "menuId": "3a02c23c-f6ad-b776-54b6-0399d45bb018",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 7,
    "parentId": null,
    "pathList": [
      7
    ]
  },
  {
    "path": "/usercenter",
    "name": "usercenter",
    "addBtn": 0,
    "children": [
      {
        "path": "/usercenter/power",
        "name": "power",
        "addBtn": 0,
        "children": [
          {
            "path": "/usercenter/power/role",
            "name": "role",
            "addBtn": 1,
            "children": [
              {
                "path": "/system/usercenter/power/role/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:power:role/insert",
                  "keppAlive": true,
                  "menuId": "7cb4ab17-d023-11ec-9aee-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  8,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/system/usercenter/power/role/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:power:role/update",
                  "keppAlive": true,
                  "menuId": "7cb61298-d023-11ec-9aee-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  8,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/system/usercenter/power/role/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:power:role/delete",
                  "keppAlive": true,
                  "menuId": "7cb740ec-d023-11ec-9aee-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  8,
                  0,
                  0,
                  2
                ]
              },
              {
                "path": "/system/usercenter/power/role/assign",
                "name": "assign",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "分配权限",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:power:role/assign",
                  "keppAlive": true,
                  "menuId": "532ef005-d193-11ec-9aee-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  8,
                  0,
                  0,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-role",
              "title": "角色管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:usercenter:power:role",
              "keppAlive": true,
              "menuId": "6eb90d70-a9a3-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              8,
              0,
              0
            ]
          }
        ],
        "meta": {
          "icon": "icon-menuse",
          "title": "权限管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:usercenter:power",
          "keppAlive": true,
          "menuId": "74d5b417-b547-11ec-9b3a-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 8,
        "pathList": [
          8,
          0
        ]
      },
      {
        "path": "/usercenter/usermanage",
        "name": "usermanage",
        "addBtn": 0,
        "children": [
          {
            "path": "/usercenter/usermanage/user",
            "name": "user",
            "addBtn": 1,
            "children": [
              {
                "path": "/system/usercenter/user/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:user/insert",
                  "keppAlive": true,
                  "menuId": "539f822f-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  8,
                  1,
                  0,
                  0
                ]
              },
              {
                "path": "/system/usercenter/user/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:user/update",
                  "keppAlive": true,
                  "menuId": "539f82db-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  8,
                  1,
                  0,
                  1
                ]
              },
              {
                "path": "/system/usercenter/user/updatePassword",
                "name": "updatePassword",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改密码",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:user/updatePassword",
                  "keppAlive": true,
                  "menuId": "3a1a3141-b73b-6370-ff2a-df3956ecc0b6",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  8,
                  1,
                  0,
                  2
                ]
              },
              {
                "path": "/system/usercenter/user/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:user/delete",
                  "keppAlive": true,
                  "menuId": "539f8373-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 0,
                "pathList": [
                  8,
                  1,
                  0,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-user",
              "title": "用户管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:usercenter:usermanage:user",
              "keppAlive": true,
              "menuId": "6eb90d71-a9a3-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 1,
            "pathList": [
              8,
              1,
              0
            ]
          },
          {
            "path": "/usercenter/usermanage/pwd",
            "name": "pwd",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-pwd",
              "title": "修改密码",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:usercenter:usermanage:pwd",
              "keppAlive": true,
              "menuId": "6eb90d72-a9a3-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 1,
            "pathList": [
              8,
              1,
              1
            ]
          },
          {
            "path": "/usercenter/usermanage/onlineuser",
            "name": "onlineuser",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/usercenter/onlineuser/search",
                "name": "search",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "刷新",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:onlineuser/search",
                  "keppAlive": true,
                  "menuId": "53998456-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  8,
                  1,
                  2,
                  0
                ]
              },
              {
                "path": "/system/usercenter/onlineuser/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:onlineuser/insert",
                  "keppAlive": true,
                  "menuId": "53998784-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  8,
                  1,
                  2,
                  1
                ]
              },
              {
                "path": "/system/usercenter/onlineuser/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:onlineuser/update",
                  "keppAlive": true,
                  "menuId": "53998821-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 2,
                "pathList": [
                  8,
                  1,
                  2,
                  2
                ]
              },
              {
                "path": "/system/usercenter/onlineuser/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:usercenter:onlineuser/delete",
                  "keppAlive": true,
                  "menuId": "539988b5-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 2,
                "pathList": [
                  8,
                  1,
                  2,
                  3
                ]
              }
            ],
            "meta": {
              "icon": "icon-onlineuser",
              "title": "在线用户",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:usercenter:usermanage:onlineuser",
              "keppAlive": true,
              "menuId": "503507c7-b092-11ec-a165-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 1,
            "pathList": [
              8,
              1,
              2
            ]
          }
        ],
        "meta": {
          "icon": "icon-menuse",
          "title": "用户管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:usercenter:usermanage",
          "keppAlive": true,
          "menuId": "afbc752e-b547-11ec-9b3a-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 1,
        "parentId": 8,
        "pathList": [
          8,
          1
        ]
      }
    ],
    "meta": {
      "icon": "icon-userManange",
      "title": "用户中心",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:usercenter",
      "keppAlive": true,
      "menuId": "6eb90d69-a9a3-11ec-acd9-18c04d580c33",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 8,
    "parentId": null,
    "pathList": [
      8
    ]
  },
  {
    "path": "/personnel",
    "name": "personnel",
    "addBtn": 0,
    "children": [
      {
        "path": "/personnel/person",
        "name": "person",
        "addBtn": 0,
        "children": [
          {
            "path": "/personnel/person/organization",
            "name": "organization",
            "addBtn": 1,
            "children": [
              {
                "path": "/personnel/person/organization/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:organization/insert",
                  "keppAlive": true,
                  "menuId": "5396a62f-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  9,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/personnel/person/organization/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:organization/update",
                  "keppAlive": true,
                  "menuId": "5396a71d-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  9,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/personnel/person/organization/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:organization/delete",
                  "keppAlive": true,
                  "menuId": "5396a7b7-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  9,
                  0,
                  0,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-organization",
              "title": "组织架构",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:personnel:person:organization",
              "keppAlive": true,
              "menuId": "3a02c243-8d8e-8906-1d94-422983a984ca",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              9,
              0,
              0
            ]
          },
          {
            "path": "/personnel/person/position",
            "name": "position",
            "addBtn": 1,
            "children": [
              {
                "path": "/personnel/person/position/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:position/insert",
                  "keppAlive": true,
                  "menuId": "5397f634-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  9,
                  0,
                  1,
                  0
                ]
              },
              {
                "path": "/personnel/person/position/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:position/update",
                  "keppAlive": true,
                  "menuId": "5397f6e2-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  9,
                  0,
                  1,
                  1
                ]
              },
              {
                "path": "/personnel/person/position/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:position/delete",
                  "keppAlive": true,
                  "menuId": "5397f773-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  9,
                  0,
                  1,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-position",
              "title": "职位管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:personnel:person:position",
              "keppAlive": true,
              "menuId": "3a02c246-29db-d1ff-d29d-a1d11b2f0df4",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              9,
              0,
              1
            ]
          },
          {
            "path": "/personnel/person/employee",
            "name": "employee",
            "addBtn": 1,
            "children": [
              {
                "path": "/personnel/person/employee/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:employee/insert",
                  "keppAlive": true,
                  "menuId": "5398c281-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  9,
                  0,
                  2,
                  0
                ]
              },
              {
                "path": "/personnel/person/employee/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:employee/update",
                  "keppAlive": true,
                  "menuId": "5398c330-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  9,
                  0,
                  2,
                  1
                ]
              },
              {
                "path": "/personnel/person/employee/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:personnel:person:employee/delete",
                  "keppAlive": true,
                  "menuId": "5398c3c2-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 2,
                "pathList": [
                  9,
                  0,
                  2,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-employee",
              "title": "员工管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:personnel:person:employee",
              "keppAlive": true,
              "menuId": "3a02c246-ac77-f593-3d31-dba4d23a8a64",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 0,
            "pathList": [
              9,
              0,
              2
            ]
          }
        ],
        "meta": {
          "icon": "icon-mulu",
          "title": "人事管理",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:personnel:person",
          "keppAlive": true,
          "menuId": "3a02c23f-775a-3331-3205-dc7841b81ecc",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 9,
        "pathList": [
          9,
          0
        ]
      }
    ],
    "meta": {
      "icon": "icon-personnel",
      "title": "人事行政",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:personnel",
      "keppAlive": true,
      "menuId": "3a02c23e-775a-3331-3205-dc7841b81ecc",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 9,
    "parentId": null,
    "pathList": [
      9
    ]
  },
  {
    "path": "/system",
    "name": "system",
    "addBtn": 0,
    "children": [
      {
        "path": "/system/data",
        "name": "data",
        "addBtn": 0,
        "children": [
          {
            "path": "/system/data/network",
            "name": "network",
            "addBtn": 1,
            "children": [
              {
                "path": "/system/setting/network/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:network/insert",
                  "keppAlive": true,
                  "menuId": "539a2a9e-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 0,
                "pathList": [
                  10,
                  0,
                  0,
                  0
                ]
              },
              {
                "path": "/system/setting/network/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:network/update",
                  "keppAlive": true,
                  "menuId": "539a2b42-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 0,
                "pathList": [
                  10,
                  0,
                  0,
                  1
                ]
              },
              {
                "path": "/system/setting/network/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:network/delete",
                  "keppAlive": true,
                  "menuId": "539a2bd1-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 0,
                "pathList": [
                  10,
                  0,
                  0,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-network",
              "title": "网点管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:network",
              "keppAlive": true,
              "menuId": "66748f85-a9a4-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 0,
            "pathList": [
              10,
              0,
              0
            ]
          },
          {
            "path": "/system/data/city",
            "name": "city",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/setting/city/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:insert",
                  "keppAlive": true,
                  "menuId": "539c6c01-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  0
                ]
              },
              {
                "path": "/system/setting/city/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:update",
                  "keppAlive": true,
                  "menuId": "539c6c9e-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  1
                ]
              },
              {
                "path": "/system/setting/city/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:delete",
                  "keppAlive": true,
                  "menuId": "539c6d29-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  2
                ]
              },
              {
                "path": "/system/setting/city/used",
                "name": "used",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "设置常用城市",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:used",
                  "keppAlive": true,
                  "menuId": "34a3af38-1dd4-11ed-8a75-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  3
                ]
              },
              {
                "path": "/system/setting/city/unused",
                "name": "unused",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "取消常用城市",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:unused",
                  "keppAlive": true,
                  "menuId": "34a5ae37-1dd4-11ed-8a75-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  4
                ]
              },
              {
                "path": "/system/setting/city/enabled",
                "name": "enabled",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "启用",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:enabled",
                  "keppAlive": true,
                  "menuId": "34a6ff30-1dd4-11ed-8a75-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  5
                ]
              },
              {
                "path": "/system/setting/city/disenalbed",
                "name": "disenalbed",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "禁用",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:disenalbed",
                  "keppAlive": true,
                  "menuId": "34a86ee9-1dd4-11ed-8a75-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 6,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  6
                ]
              },
              {
                "path": "/system/setting/city/openused",
                "name": "openused",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "启用自定义城市",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:city:openused",
                  "keppAlive": true,
                  "menuId": "34aa19ea-1dd4-11ed-8a75-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 7,
                "parentId": 1,
                "pathList": [
                  10,
                  0,
                  1,
                  7
                ]
              }
            ],
            "meta": {
              "icon": "icon-city",
              "title": "自定义城市",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:city",
              "keppAlive": true,
              "menuId": "66749683-a9a4-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 0,
            "pathList": [
              10,
              0,
              1
            ]
          },
          {
            "path": "/system/setting/dict",
            "name": "dict",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/setting/dict/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:dict/insert",
                  "keppAlive": true,
                  "menuId": "539bb152-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 2,
                "pathList": [
                  10,
                  0,
                  2,
                  0
                ]
              },
              {
                "path": "/system/setting/dict/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:dict/update",
                  "keppAlive": true,
                  "menuId": "539bb1f0-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 2,
                "pathList": [
                  10,
                  0,
                  2,
                  1
                ]
              },
              {
                "path": "/system/setting/dict/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:dict/delete",
                  "keppAlive": true,
                  "menuId": "539bb283-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 2,
                "pathList": [
                  10,
                  0,
                  2,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-dict",
              "title": "数据字典",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:setting:dict",
              "keppAlive": true,
              "menuId": "667495e3-a9a4-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 0,
            "pathList": [
              10,
              0,
              2
            ]
          },
          {
            "path": "/system/data/route",
            "name": "route",
            "addBtn": 1,
            "children": [
              {
                "path": "/system/data/route/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:data:route:insert",
                  "keppAlive": true,
                  "menuId": "89d72603-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  10,
                  0,
                  3,
                  0
                ]
              },
              {
                "path": "/system/data/route/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:data:route:update",
                  "keppAlive": true,
                  "menuId": "89d875b7-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  10,
                  0,
                  3,
                  1
                ]
              },
              {
                "path": "/system/data/route/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:data:route:delete",
                  "keppAlive": true,
                  "menuId": "89da08c3-ede7-11ec-aab8-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 3,
                "pathList": [
                  10,
                  0,
                  3,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-route",
              "title": "网点线路",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:route",
              "keppAlive": true,
              "menuId": "3a046d3a-e2c1-27f8-e702-6453975bf621",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 0,
            "pathList": [
              10,
              0,
              3
            ]
          },
          {
            "path": "/system/data/subject",
            "name": "subject",
            "addBtn": 1,
            "children": [
              {
                "path": "/system/setting/subject/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:subject/insert",
                  "keppAlive": true,
                  "menuId": "539d0fe1-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 4,
                "pathList": [
                  10,
                  0,
                  4,
                  0
                ]
              },
              {
                "path": "/system/setting/subject/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:subject/update",
                  "keppAlive": true,
                  "menuId": "539d108c-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 4,
                "pathList": [
                  10,
                  0,
                  4,
                  1
                ]
              },
              {
                "path": "/system/setting/subject/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:subject/delete",
                  "keppAlive": true,
                  "menuId": "539d111e-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 4,
                "pathList": [
                  10,
                  0,
                  4,
                  2
                ]
              }
            ],
            "meta": {
              "icon": "icon-subject",
              "title": "科目管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:subject",
              "keppAlive": true,
              "menuId": "66749684-a9a4-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 0,
            "pathList": [
              10,
              0,
              4
            ]
          },
          {
            "path": "/system/data/audit",
            "name": "audit",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/data/audit/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:data:audit:update",
                  "keppAlive": true,
                  "menuId": "3a1220eb-ccb4-ad3e-ab84-0f69a93aadaf",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 5,
                "pathList": [
                  10,
                  0,
                  5,
                  0
                ]
              }
            ],
            "meta": {
              "icon": "icon-route",
              "title": "审批设置",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:audit",
              "keppAlive": true,
              "menuId": "3a1220e4-f33a-f516-5d79-952264fc7ee9",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 5,
            "parentId": 0,
            "pathList": [
              10,
              0,
              5
            ]
          }
        ],
        "meta": {
          "icon": "",
          "title": "系统数据",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:system:data",
          "keppAlive": true,
          "menuId": "3a046d35-6f6a-16d1-7366-de97ec7a5b95",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 0,
        "parentId": 10,
        "pathList": [
          10,
          0
        ]
      },
      {
        "path": "/system/setting",
        "name": "setting",
        "addBtn": 0,
        "children": [
          {
            "path": "/system/setting/messageCenter",
            "name": "messageCenter",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-wenjian",
              "title": "消息中心",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:setting:messageCenter",
              "keppAlive": true,
              "menuId": "3a0f4b3d-e32c-cd75-56a5-772c250fd7a3",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 1,
            "pathList": [
              10,
              1,
              0
            ]
          },
          {
            "path": "/system/setting/print",
            "name": "print",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/setting/print/templateUpload",
                "name": "templateUpload",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Upload",
                  "title": "模板上传",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:pint:design",
                  "keppAlive": true,
                  "menuId": "3a213658-cb42-a69f-2f07-b6300ad28181",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 0,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  0
                ]
              },
              {
                "path": "/system/setting/print/templateDownload",
                "name": "templateDownload",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Download",
                  "title": "模板下载",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:pirnt:templateDownload",
                  "keppAlive": true,
                  "menuId": "3a213664-8b13-ca4a-9aa6-5e9da72cfa95",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 1,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  1
                ]
              },
              {
                "path": "/system/setting/print/insert",
                "name": "insert",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "新增",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/insert",
                  "keppAlive": true,
                  "menuId": "539ac4d8-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 2,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  2
                ]
              },
              {
                "path": "/system/setting/print/update",
                "name": "update",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "修改",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/update",
                  "keppAlive": true,
                  "menuId": "539ac57e-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 3,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  3
                ]
              },
              {
                "path": "/system/setting/print/delete",
                "name": "delete",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "删除",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/delete",
                  "keppAlive": true,
                  "menuId": "539ac614-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 4,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  4
                ]
              },
              {
                "path": "/system/setting/print/design",
                "name": "design",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "设计模板",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print:design",
                  "keppAlive": true,
                  "menuId": "2446a7fb-e53c-11ec-a26c-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 5,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  5
                ]
              },
              {
                "path": "/system/setting/print/setdefault",
                "name": "setdefault",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "设置默认模板",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/setdefault",
                  "keppAlive": true,
                  "menuId": "4a4de10d-e213-11ec-8183-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 6,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  6
                ]
              },
              {
                "path": "/system/setting/print/canceldefault",
                "name": "canceldefault",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "取消默认模板",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/canceldefault",
                  "keppAlive": true,
                  "menuId": "3a2030ec-79ad-726c-c2ee-9299b2136bb7",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 7,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  7
                ]
              },
              {
                "path": "/system/setting/print/backup",
                "name": "backup",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "备份",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/backup",
                  "keppAlive": true,
                  "menuId": "98d973e4-e213-11ec-8183-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 8,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  8
                ]
              },
              {
                "path": "/system/setting/print/backuphistory",
                "name": "backuphistory",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "备份历史",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print/backuphistory",
                  "keppAlive": true,
                  "menuId": "ef84cf3a-e213-11ec-8183-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 9,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  9
                ]
              },
              {
                "path": "/system/setting/print/defaultprinter",
                "name": "defaultprinter",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "设置默认打印机",
                  "i18n": false,
                  "remark": "",
                  "menuType": 3,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:print:defaultprinter",
                  "keppAlive": true,
                  "menuId": "3a1a1db4-fa3f-844a-8dfc-3986594a1ed3",
                  "showLink": true,
                  "dynamicLevel": -1
                },
                "id": 10,
                "parentId": 1,
                "pathList": [
                  10,
                  1,
                  1,
                  10
                ]
              }
            ],
            "meta": {
              "icon": "icon-print",
              "title": "打印设置",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:setting:print",
              "keppAlive": true,
              "menuId": "66749506-a9a4-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 1,
            "pathList": [
              10,
              1,
              1
            ]
          },
          {
            "path": "/system/setting/define",
            "name": "define",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/setting/define/shipsetting",
                "name": "shipsetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "search.png",
                  "title": "运单设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:shipsetting",
                  "keppAlive": true,
                  "menuId": "539d9c56-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  0
                ]
              },
              {
                "path": "/system/setting/define/transetting",
                "name": "transetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Plus",
                  "title": "配载设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:transetting",
                  "keppAlive": true,
                  "menuId": "539d9f50-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  1
                ]
              },
              {
                "path": "/system/setting/define/switchsetting",
                "name": "switchsetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "中转外发设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:switchsetting",
                  "keppAlive": true,
                  "menuId": "25461f73-25a8-11ed-8518-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 2,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  2
                ]
              },
              {
                "path": "/system/setting/define/feesetting",
                "name": "feesetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Edit",
                  "title": "费用设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:feesetting",
                  "keppAlive": true,
                  "menuId": "539d9fec-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 3,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  3
                ]
              },
              {
                "path": "/system/setting/define/elsesetting",
                "name": "elsesetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "Delete",
                  "title": "其它设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:elsesetting",
                  "keppAlive": true,
                  "menuId": "539da07f-b097-11ec-a165-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 4,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  4
                ]
              },
              {
                "path": "/system/setting/define/fieldsetting",
                "name": "fieldsetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "自定义字段",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:fieldsetting",
                  "keppAlive": true,
                  "menuId": "3a0d5668-b96a-18d1-77d8-f72a63aa4337",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 5,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  5
                ]
              },
              {
                "path": "/system/setting/define/carfeesetting",
                "name": "carfeesetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "出车费用设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:carfeesetting",
                  "keppAlive": true,
                  "menuId": "3a10662c-adb5-fa96-5c20-7460bca0d08d",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 6,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  6
                ]
              },
              {
                "path": "/system/setting/define/carWarnSetting",
                "name": "carWarnSetting",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "车辆预警设置",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:define:carWarnSetting",
                  "keppAlive": true,
                  "menuId": "3a18fd33-dc1d-bd77-4b33-5bc6f68503f3",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 7,
                "parentId": 3,
                "pathList": [
                  10,
                  1,
                  3,
                  7
                ]
              }
            ],
            "meta": {
              "icon": "icon-define",
              "title": "自定义设置",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:setting:define",
              "keppAlive": true,
              "menuId": "66749745-a9a4-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 3,
            "parentId": 1,
            "pathList": [
              10,
              1,
              3
            ]
          },
          {
            "path": "/system/setting/enconnect",
            "name": "enconnect",
            "addBtn": 0,
            "children": [
              {
                "path": "/system/setting/enconnect/concarrier",
                "name": "concarrier",
                "addBtn": 0,
                "children": [
                  {
                    "path": "/system/setting/enconnect/concarrier/insert",
                    "name": "insert",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Plus",
                      "title": "新增",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:system:setting:enconnect:concarrier:insert",
                      "keppAlive": true,
                      "menuId": "e8207177-22c4-11ed-95be-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 0,
                    "parentId": 0,
                    "pathList": [
                      10,
                      1,
                      4,
                      0,
                      0
                    ]
                  },
                  {
                    "path": "/system/setting/enconnect/concarrier/enable",
                    "name": "enable",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Plus",
                      "title": "通过",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:system:setting:enconnect:concarrier:enable",
                      "keppAlive": true,
                      "menuId": "e823fa6b-22c4-11ed-95be-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 1,
                    "parentId": 0,
                    "pathList": [
                      10,
                      1,
                      4,
                      0,
                      1
                    ]
                  },
                  {
                    "path": "/system/setting/enconnect/concarrier/disenable",
                    "name": "disenable",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "停用",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:system:setting:enconnect:concarrier:disenable",
                      "keppAlive": true,
                      "menuId": "e8253325-22c4-11ed-95be-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 2,
                    "parentId": 0,
                    "pathList": [
                      10,
                      1,
                      4,
                      0,
                      2
                    ]
                  },
                  {
                    "path": "/system/setting/enconnect/concarrier/delete",
                    "name": "delete",
                    "addBtn": 0,
                    "children": [],
                    "meta": {
                      "icon": "Delete",
                      "title": "删除",
                      "i18n": false,
                      "remark": "",
                      "menuType": 3,
                      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                      "perms": "api:system:setting:enconnect:concarrier:delete",
                      "keppAlive": true,
                      "menuId": "e826c79e-22c4-11ed-95be-18c04d580c33",
                      "showLink": true,
                      "dynamicLevel": -1
                    },
                    "id": 3,
                    "parentId": 0,
                    "pathList": [
                      10,
                      1,
                      4,
                      0,
                      3
                    ]
                  }
                ],
                "meta": {
                  "icon": "",
                  "title": "互联承运商记录",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:enconnect:concarrier",
                  "keppAlive": true,
                  "menuId": "52ae3b0e-22c4-11ed-95be-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 0,
                "parentId": 4,
                "pathList": [
                  10,
                  1,
                  4,
                  0
                ]
              },
              {
                "path": "/system/setting/enconnect/conkey",
                "name": "conkey",
                "addBtn": 0,
                "children": [],
                "meta": {
                  "icon": "",
                  "title": "对接密钥",
                  "i18n": false,
                  "remark": "",
                  "menuType": 4,
                  "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
                  "perms": "api:system:setting:enconnect:conkey",
                  "keppAlive": true,
                  "menuId": "52b0062e-22c4-11ed-95be-18c04d580c33",
                  "showLink": true,
                  "dynamicLevel": 1
                },
                "id": 1,
                "parentId": 4,
                "pathList": [
                  10,
                  1,
                  4,
                  1
                ]
              }
            ],
            "meta": {
              "icon": "icon-enconnect",
              "title": "企业互联",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:setting:enconnect",
              "keppAlive": true,
              "menuId": "e72b9ffb-22c3-11ed-95be-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 4,
            "parentId": 1,
            "pathList": [
              10,
              1,
              4
            ]
          },
          {
            "path": "/system/setting/messageManager",
            "name": "messageManager",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-wenjian",
              "title": "消息管理",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:setting:messageManager",
              "keppAlive": true,
              "menuId": "3a237cb3-ba56-dc06-bc39-7a43beca9778",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 5,
            "parentId": 1,
            "pathList": [
              10,
              1,
              5
            ]
          }
        ],
        "meta": {
          "icon": "icon-mulu",
          "title": "系统设置",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:system:setting",
          "keppAlive": true,
          "menuId": "66748f84-a9a4-11ec-acd9-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 1,
        "parentId": 10,
        "pathList": [
          10,
          1
        ]
      },
      {
        "path": "/system/log",
        "name": "log",
        "addBtn": 0,
        "children": [
          {
            "path": "/system/log/loginlog",
            "name": "loginlog",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-loginlog",
              "title": "登录日志",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:loginlog",
              "keppAlive": true,
              "menuId": "cdd75780-a9a5-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 0,
            "parentId": 2,
            "pathList": [
              10,
              2,
              0
            ]
          },
          {
            "path": "/system/log/operlog",
            "name": "operlog",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-operlog",
              "title": "操作日志",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:operlog",
              "keppAlive": true,
              "menuId": "cdd75d8b-a9a5-11ec-acd9-18c04d580c33",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 1,
            "parentId": 2,
            "pathList": [
              10,
              2,
              1
            ]
          },
          {
            "path": "/system/log/updataNews",
            "name": "updataNews",
            "addBtn": 0,
            "children": [],
            "meta": {
              "icon": "icon-operlog",
              "title": "更新日志",
              "i18n": false,
              "remark": "",
              "menuType": 2,
              "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
              "perms": "api:system:data:updataNews",
              "keppAlive": true,
              "menuId": "3a1ab325-bbe9-7aa9-8719-9467f9033536",
              "showLink": true,
              "dynamicLevel": -1
            },
            "id": 2,
            "parentId": 2,
            "pathList": [
              10,
              2,
              2
            ]
          }
        ],
        "meta": {
          "icon": "icon-mulu",
          "title": "系统日志",
          "i18n": false,
          "remark": "",
          "menuType": 1,
          "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
          "perms": "api:system:log",
          "keppAlive": true,
          "menuId": "6eb90e44-a9a3-11ec-acd9-18c04d580c33",
          "showLink": true,
          "dynamicLevel": -1
        },
        "id": 2,
        "parentId": 10,
        "pathList": [
          10,
          2
        ]
      }
    ],
    "meta": {
      "icon": "icon-systemManage",
      "title": "系统管理",
      "i18n": false,
      "remark": "",
      "menuType": 1,
      "tenantId": "3a0a441d-8cfa-d0aa-257d-11ee859a08c2",
      "perms": "api:system",
      "keppAlive": true,
      "menuId": "3a02c23d-64d7-f69f-7b41-dbdea5b2f97c",
      "showLink": true,
      "dynamicLevel": -1
    },
    "id": 10,
    "parentId": null,
    "pathList": [
      10
    ]
  }
];
