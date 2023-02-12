import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api8201/admin/user/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/api8201/admin/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/api8201/vue-element-admin/user/logout",
    method: "post",
  });
}
