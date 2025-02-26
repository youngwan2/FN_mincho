

export function profileFormValidateField(name: string, value: string) {
    const errors: { [key: string]: string } = {};

    if (name === "nickname") {
        if (value.length < 2) {
            errors.nickname = "닉네임의 길이는 최소 2자 이상이어야 합니다.";
        } else {
            errors.nickname = ""; // 정상 입력 시 에러 제거
        }
    }

    if (name === "introduction") {
        if (value.length > 100) {
            errors.introduction = "자기소개는 최대 100자까지 입력할 수 있습니다.";
        } else {
            errors.introduction = ""; // 정상 입력 시 에러 제거
        }
    }

    return errors;
}