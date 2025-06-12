import { Link } from "react-router"
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import Submit from "../../../components/button/Submit";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import Logo from "../../../components/icon/Logo";
import { useState } from "react";
import { legalDocuments } from '@/config/legal';
import ConsentCheckboxGroup, { ConsentState } from './ConsentCheckboxGroup';
import ConsentModal from './ConsentModal';

/** TODO: 이메일 인증 번호 */
export default function SignupForm() {

    const {
        errors,
        isAction,
        isLoading,
        isCheck,
        isValidEmailMx,
        isValidVerificationCode,
        handleEmailChange,
        handleEmailCheck,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleVerificationCodeChange,
        handleVerificationCodeCheck,
        handleSendVerificationCode,
        handleSubmit,
    } = useRegisterForm()

    // 개인정보 수집 동의 상태
    const [consent, setConsent] = useState<ConsentState>({
        essentialInfoConsent: false,
        optionalInfoConsent: false,
        automaticInfoConsent: false,
        marketingConsent: false,
    });
    const [consentError, setConsentError] = useState<string | null>(null);
    const [modalDoc, setModalDoc] = useState<null | { title: string, path: string }>(null);

    // 모달 열기/닫기
    const openModal = (docId: string) => {
        const doc = legalDocuments.find(d => d.id === docId);
        if (doc) setModalDoc({ title: doc.title, path: doc.path });
    };
    const closeModal = () => setModalDoc(null);

    // 동의 체크박스 핸들러
    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setConsent((prev) => ({ ...prev, [name]: checked }));

        // 필수 정보 수집 동의 체크 시 에러 메시지 초기화
        if (name === 'essentialInfoConsent' && checked) {
            setConsentError(null);
        }
    };

    // 기존 handleSubmit 래핑
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!consent.essentialInfoConsent) {
            setConsentError('필수 정보 수집 및 이용에 동의해야 회원가입이 가능합니다.');
            e.preventDefault();
            return;
        }
        setConsentError(null);
        handleSubmit(e); // 동의 항목은 추후 API 요청에 포함 필요
    };

    return (
        <div className="flex max-w-[812px] bg-white h-full w-full flex-col justify-center items-center relative" >
            <Link title="사이트 로고, 클릭 시 홈페이지로" className="absolute left-5 top-10" to={"/"}>
                <Logo />
            </Link>
            <h2 className="text-3xl font-bold  animate-fade-down">회원등록</h2>
            <form className="mt-13 w-full max-w-[60%]  animate-fade-down" onSubmit={handleFormSubmit} >
                {/* 이메일 */}
                <div>
                    <div className="flex flex-col  w-full">
                        <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="email" title="이메일"><HiOutlineMail className="mr-2" />이메일(Email)</label>
                        <div className="flex">
                            <input
                                className="p-2 w-full border border-r-0 border-[#e6e7e9] rounded-l-[5px]"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="이메일"
                                onChange={handleEmailChange}
                            />

                            <button
                                onClick={handleEmailCheck}
                                disabled={isCheck}
                                type="button"
                                className={`disabled:cursor-not-allowed disabled:opacity-60 hover:bg-[#F2F2F7] cursor-pointer w-[50px] border py-2 border-l border-[#e6e7e9] rounded-r-[5px]`}>
                                {isCheck ? "완료" : "확인"}
                            </button>
                        </div>
                    </div>
                    {errors.email && <p className="text-red-500 text-left text-[14px]">{errors.email}</p>}
                </div>

                {/* 인증번호 */}
                <div className=" mt-5r">
                    <div className=" mt-5 flex items-center">
                        <div className="flex justify-start  w-full">
                            <input
                                className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                type="text"
                                placeholder="인증번호"
                                onChange={handleVerificationCodeChange}
                            />
                        </div>
                        {
                            isValidEmailMx
                                ? <button
                                    type="button"
                                    onClick={handleVerificationCodeCheck}
                                    disabled={isValidVerificationCode}
                                    className={`${isValidVerificationCode ? "disabled:cursor-not-allowed disabled:opacity-60 " : ""} hover:bg-[#F2F2F7] cursor-pointer w-[100px] border py-2 border-l-0 border-[#e6e7e9] rounded-r-[5px]`}>
                                    {!isValidVerificationCode ? "확인" : "완료"}
                                </button>
                                : <button
                                    type="button"
                                    onClick={handleSendVerificationCode}
                                    className="hover:bg-[#F2F2F7] cursor-pointer w-[100px] border py-2 border-l-0 border-[#e6e7e9] rounded-r-[5px]">
                                    인증요청
                                </button>
                        }

                    </div>
                    {errors.verificationCode && <p className="text-red-500 text-left text-[14px]">{errors.verificationCode}</p>}
                </div>

                {/* 비밀번호 */}
                <div className="mt-10">
                    <div className="flex flex-col w-full">
                        <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="password" title="비밀번호"><IoLockOpenOutline className="mr-2" />비밀번호</label>
                        <input
                            className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-left text-[14px]">{errors.password}</p>}
                </div>

                {/* 비밀번호 재확인 */}
                <div className="mt-8">
                    <div className="flex flex-col w-full">
                        <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="password-confirm" title="비밀번호 재확인"><IoLockClosedOutline className="mr-2" />비밀번호 재확인</label>
                        <input
                            className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            placeholder="비밀번호 재확인"
                            onChange={handlePasswordConfirmChange}
                        />
                    </div>
                    {errors.passwordConfirm && <p className="text-red-500 text-left text-[14px]">{errors.passwordConfirm}</p>}
                </div>

                {/* 정보 수집 동의 영역 */}
                <ConsentCheckboxGroup
                    consent={consent}
                    consentError={consentError}
                    onConsentChange={handleConsentChange}
                    onOpenModal={openModal}
                />

                <Submit
                    disabled={!isAction || !consent.essentialInfoConsent}
                    text={isAction && consent.essentialInfoConsent
                        ? '회원가입'
                        : '요건 충족 시 활성화'}
                    className={`${isLoading || !isAction || !consent.essentialInfoConsent ? 'opacity-60 disabled:cursor-not-allowed' : ''} cursor-pointer mt-10 text-white bg-[#05D182] hover:bg-[#07BD77] w-full p-2 rounded-[5px]`} />
            </form>

            {/* 로그인 안내 링크 */}
            <div className="mt-8 text-[14px]  animate-fade-down" >
                <span>회원 이신가요?</span>
                <Link to="/auth/login" className="ml-2 border-b hover:text-[#05D182]">로그인</Link>
            </div>

            {/* 모달 컴포넌트로 대체 */}
            <ConsentModal
                open={!!modalDoc}
                title={modalDoc?.title || ''}
                path={modalDoc?.path || ''}
                onClose={closeModal}
            />
        </div >
    )
}