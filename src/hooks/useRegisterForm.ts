import { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { passwordConfirmValidator, validator } from '../utils/auth';
import { emailCheck, register, sendVerificationCode, verificationCodeCheck } from '../service/auth';
import { PAGE_URLs } from '../config/urls';

interface FormErrors {
    email: string;
    password: string;
    passwordConfirm: string;
    emailCheck: string;
    verificationCode: string;
}

interface RegisterRequest {
    email: string;
    password: string;
    passwordConfirm?: string;
}

const AUTH_CODE_LENGTH = 5
export const useRegisterForm = () => {

    const router = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isValidEmailMx, setIsValidEmailMx] = useState(false);
    const [isCheck, setIsCheck] = useState<boolean | undefined>(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidVerificationCode, setIsValidVerificationCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<FormErrors>({
        email: '',
        password: '',
        passwordConfirm: '',
        emailCheck: '',
        verificationCode: ''
    });




    /** 인증코드 상태저장 */
    const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value;

        if (code.toString().length < AUTH_CODE_LENGTH || code.toString().length > AUTH_CODE_LENGTH) {
            setErrors(prev => ({
                ...prev,
                verificationCode: `인증코드는 ${AUTH_CODE_LENGTH} 자리이어야 합니다.`
            }))
            return;
        }
        setErrors(prev => ({
            ...prev,
            verificationCode: ``
        }))

        setVerificationCode(code)

    }

    /** 이메일 유효성 */
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const isValid = validator(newEmail, 'EMAIL');
        setErrors(prev => ({
            ...prev,
            email: isValid ? '' : '이메일 형식이 일치하지 않습니다.'
        }));
    };

    /** 비밀번호 유효성 */
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const isValid = validator(newPassword, 'PASSWORD');
        setErrors(prev => ({
            ...prev,
            password: isValid ? '' : '비밀번호 형식이 일치하지 않습니다.'
        }));
    };

    /** 비밀번호 재확인 */
    const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        const confirmValue = e.target.value;
        const isValidPasswordConfirm = passwordConfirmValidator(password, confirmValue);

        setIsValidPassword(isValidPasswordConfirm)
        setErrors(prev => ({
            ...prev,
            passwordConfirm: !isValidPasswordConfirm ? '비밀번호가 서로 일치하지 않습니다.' : ''
        }));
    };



    /** 이메일 중복 확인 */
    const handleEmailCheck = async () => {
        const toastId = toast.loading("이메일 중복 확인중..")
        if (errors.email) {
            toast.info("이메일 유효성 통과 후 요청해주세요.");
            return;
        }

        const success = await emailCheck({ email });

        if (success) {
            toast.dismiss(toastId)
            toast.success("사용가능한 이메일입니다.")
        } else {
            toast.dismiss(toastId)
        }
        setIsCheck(success);
    };

    /** 이메일 인증번호 검증  */
    const handleVerificationCodeCheck = async () => {
        const toastId = toast.loading("인증번호 확인중..")
        if (verificationCode.toString().length < AUTH_CODE_LENGTH) {
            setErrors(prev => ({
                ...prev,
                verificationCode: `인증코드는 ${AUTH_CODE_LENGTH} 자리이어야 합니다.`
            }))
            return;
        }

        const success = await verificationCodeCheck(email, verificationCode);

        if (success) {
            setIsValidVerificationCode(true)
            toast.dismiss(toastId)
            toast.success("인증번호가 일치합니다.")
        } else {
            setIsValidVerificationCode(false)
            toast.dismiss(toastId)
        }
    }

    /** 이메일 인증번호 발송 */
    const handleSendVerificationCode = async () => {

        const toastId = toast.loading("인증번호 발송중..")

        if (errors.email) {
            setErrors(prev => ({
                ...prev,
                verificationCode: `이메일 유효성 통과 후 요청해주세요.`
            }))
            return;
        }
        const success = await sendVerificationCode(email)
        if (success) {
            setIsValidEmailMx(true)
            toast.dismiss(toastId)
            toast.success("인증번호가 발송되었습니다.")
        } else {
            setIsValidEmailMx(false)
            toast.dismiss(toastId)
            toast.error("인증번호 발송에 실패하였습니다.");
        }
    }


    /** 회원가입 요청 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        const formData = new FormData(e.currentTarget);
        const registerRequest: RegisterRequest = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const data = await register(registerRequest);
        setIsLoading(false)

        // 로그인 페이지로 리디렉션
        router(PAGE_URLs.LOGIN_URL)

        return data;
    };


    /** 유효성 검증이 모두 통과하면 isAction 이 true 가 되고 폼 전송 가능 */
    const isAction = [isCheck, isValidPassword, isValidEmailMx, isValidVerificationCode].every(e => e);

    return {
        email,
        password,
        errors,
        isAction,
        isLoading,
        isCheck,
        isValidEmailMx,
        isValidVerificationCode,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleVerificationCodeChange,
        handleVerificationCodeCheck,
        handleSendVerificationCode,
        handleEmailCheck,
        handleSubmit
    };
};