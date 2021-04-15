export const DATE_PLACEHOLDER = 'DD / MM / YYYY';
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DD_MM_YYYY_FORMAT = 'DD/MM/YYYY';
export const DD_MM_YYYY_DEFAULT = 'DD-MM-YYYY';
export const DATE_MONTH_FORMAT = 'dd MMM yyyy';
export const DATE_4_FORMAT = 'YYYY-MM-DD';
export const TIME_4_FORMAT = 'hh:mm';

export const ACCESS_TOKEN = 'accessToken';
export const ROLE_LIST = 'roles';
export const ADMIN = 'ROLE_ADMIN';
export const MOD = 'ROLE_MOD';

export const STORAGE_KEY = {
  ROLE: 'role',
};

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  UNAUTHORIZED: null,
};

export const MODE = {
  NEW: 'NEW',
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
};

export const FILTER_STATUS = {
  ALL: { value: '', name: 'Tất cả' },
  ACTIVE: { value: true, name: 'Hoạt động' },
  IN_ACTIVE: { value: false, name: 'Tạm dừng' },
};

export const FILTER_DELETE = {
  ALL: { value: '', name: 'Tất cả' },
  DELETED: { value: true, name: 'Đã xóa' },
  NOT_DELETED: { value: false, name: 'Chưa xóa' },
};

export const FILTER_HOT_ITEM = {
  ALL: { value: '', name: 'Tất cả' },
  HOT: { value: true, name: 'Nổi bật' },
  NORMAL: { value: false, name: 'Thông thường' },
};

export const FILTER_NEW_ITEM = {
  ALL: { value: '', name: 'Tất cả' },
  NEW: { value: true, name: 'Mới' },
  NORMAL: { value: false, name: 'Thông thường' },
};

export const FILTER_TRANSACTION_TYPE = {
  ALL: { value: '', name: 'Tất cả' },
  CHARGE_POINT_VOUCHER: { value: 'CHARGE_POINT_VOUCHER', name: 'Mua voucher' },
  CHARGE_POINT_ITEM: { value: 'CHARGE_POINT_ITEM', name: 'Mua sản phẩm' },
  ADD_POINT: { value: 'ADD_POINT', name: 'Nạp điểm' },
};

export const FILTER_TRANSACTION_STATUS = {
  ALL: { value: '', name: 'Tất cả' },
  // NEW: { value: 'NEW', name: 'Mới' },
  SHIPPING: { value: 'SHIPPING', name: 'Đang vận chuyển' },
  IN_PROCESS: { value: 'IN_PROCESS', name: 'Đang xử lý' },
  COMPLETED: { value: 'COMPLETED', name: 'Đã hoàn thành' },
  FAILURE: { value: 'FAILURE', name: 'Hủy' },
};

export const EMAIL_PATTERN = /\S+@\S+\.\S+/
export const PHONE_NUMBER_PATTERN = /^[0-9]{10}$/;

export const ERROR_CODES = [
  {errorCode: "EMAIL_IS_EXITS", errorMessage: "Email đã tồn tại!"},
  {errorCode: "BAD_CREDENTIALS", errorMessage: "Thông tin đăng nhập không hợp lệ!"},
  {errorCode: "VOUCHER_CODE_EXIST", errorMessage: "Mã voucher đã tồn tại!"},
  {errorCode: "INTERNAL_SERVER_ERROR", errorMessage: "INTERNAL_SERVER_ERROR"},
]


export const CONST_PAGE_SIZE = [
  {
    text: "5",
    value: 5
  },
  {
    text: "10",
    value: 10
  },
  {
    text: "20",
    value: 20
  }, {
    text: "50",
    value: 50
  }
]
