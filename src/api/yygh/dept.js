import request from "@/utils/request";

const prefix = "/api8222/admin/hospital/department";
export default {
  getDeptList(hoscode) {
    return request({
      url: `${prefix}/${hoscode}`,
      method: "get",
    });
  },
};
