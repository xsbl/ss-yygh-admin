import request from "@/utils/request";

const prefix = "/api8222/admin/hospital/schedule";
export default {
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `${prefix}/${page}/${limit}/${hoscode}/${depcode}`,
      method: "get",
    });
  },
};
