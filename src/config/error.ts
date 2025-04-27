import { showToast } from "../components/toast/CustomToast";

/** 에러 상태 코드별 에러 처리 */
export function handleError(error: any) {
    const status = error?.response?.status;

    if (status === 401) {
        showToast.error("로그인이 필요합니다.");
    } else if (status === 403) {
        showToast.error("권한이 없습니다.");
    } else if (status >= 499) {
        showToast.error("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else {
        showToast.error("요청을 처리하지 못했습니다. 다시 시도해주세요.");
    }

    console.error("에러 발생:", error);
}
