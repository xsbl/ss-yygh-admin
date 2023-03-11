import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  //设置页面标题
  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();
  //如果有token
  if (hasToken) {
    if (to.path === "/login") {
      //已经有token了，还要去login，那就直接到home
      next({ path: "/" });
      NProgress.done();
    } else {
      //如果去的是其他页面，就要判断有没有角色（有token还不行，还要有角色）
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        //有角色，直接放行
        next();
      } else {
        try {
          //没有角色的话，就发接口获取角色；并且角色roles是一个数组，比如['developer','editor']
          const { roles } = await store.dispatch("user/getInfo");

          //根据角色生成对应的可访问路由
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );

          //动态添加可访问的路由
          router.addRoutes(accessRoutes);

          //放行
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    //没有token时
    //白名单直接放行
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      //不是白名单去login
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
