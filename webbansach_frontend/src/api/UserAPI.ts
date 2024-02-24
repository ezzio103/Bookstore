import { endpointBE } from "../layouts/utils/Constant";
import UserModel from "../models/UserModel";
// import { request, RequireAdmin } from "./Request";
import request from "./Request";
// import RequireAdmin from "../layouts/admin/RequireAdmin";
// import { getRoleByIdUser } from "./RoleApi";

async function getUser(endpoint: string): Promise<UserModel> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response;
}

// export async function getAllUserRole(): Promise<UserModel[]> {
//    const endpoint: string = endpointBE + `/roles`;
//    const response = await requestAdmin(endpoint);

//    const data = response._embedded.roles.map((roleData: any) => {
//       // Duyệt qua mảng listUsers trong mỗi vai trò (role)
//       const users = roleData._embedded.listUsers.map((userData: any) => {
//          // Xử lý các trường dữ liệu trong userData tại đây
//          const user: UserModel = {
//             idUser: userData.idUser,
//             avatar: userData.avatar,
//             dateOfBirth: userData.dateOfBirth,
//             deliveryAddress: userData.deliveryAddress,
//             email: userData.email,
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             gender: userData.gender,
//             phoneNumber: userData.phoneNumber,
//             username: userData.username,
//             role: roleData.nameRole,
//          };
//          return user;
//       });
//       return users;
//    });

//    return data;
// }

export async function get1User(idUser: any): Promise<UserModel> {
   const endpoint = endpointBE + `/nguoi-dung/${idUser}`;
   const responseUser = await request(endpoint);
//    const responseRole = await getRoleByIdUser(idUser);

   const user: UserModel = {
      idUser: responseUser.maNguoiDung,
    //   avatar: responseUser.avatar,
    //   dateOfBirth: responseUser.dateOfBirth,
      deliveryAddress: responseUser.diaChiGiaoHang,
      email: responseUser.email,
      firstName: responseUser.hoDem,
      lastName: responseUser.ten,
      gender: responseUser.gioiTinh,
      phoneNumber: responseUser.soDienThoai,
      username: responseUser.tenDangNhap,
    //   role: responseRole.idRole,
   };

   return user;
}

// export async function getUserByIdReview(idReview: number): Promise<UserModel> {
//    // Xác định endpoint
//    const endpoint: string = endpointBE + `/reviews/${idReview}/user`;

//    return getUser(endpoint);
// }