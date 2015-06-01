// Meta data used by the AngularJS docs app
angular.module('navData', [])
  .value('NG_NAVIGATION', {
  "api": {
    "id": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "SuhUi",
        "href": "api/SuhUi",
        "type": "group",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/SuhUi/directive"
          },
          {
            "name": "shUiDialog",
            "href": "api/SuhUi/directive/shUiDialog",
            "type": "directive"
          },
          {
            "name": "shUiToast",
            "href": "api/SuhUi/directive/shUiToast",
            "type": "directive"
          },
          {
            "name": "service",
            "type": "section",
            "href": "api/SuhUi/service"
          },
          {
            "name": "shDialog",
            "href": "api/SuhUi/service/shDialog",
            "type": "service"
          },
          {
            "name": "shToast",
            "href": "api/SuhUi/service/shToast",
            "type": "service"
          }
        ]
      }
    ]
  }
});
