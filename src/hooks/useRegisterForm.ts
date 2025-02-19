import { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { passwordConfirmValidator, validator } from '../utils/auth';
import { emailCheck, register } from '../service/auth';
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
    const [verificationCode, setVerificationCode] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, setPasswordConfirm] = useState('');
    const [isCheck, setIsCheck] = useState<boolean | undefined>(false);
    const [errors, setErrors] = useState<FormErrors>({
        email: '',
        password: '',
        passwordConfirm: '',
        emailCheck: '',
        verificationCode: ''
    });

    const isAction = !errors.email && !errors.emailCheck && !errors.password && !errors.passwordConfirm;

    /** 인증코드 상태저장 */
    const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value;

        if (code.toString().length < AUTH_CODE_LENGTH) {
            setErrors(prev => ({
                ...prev,
                verificationCode: `인증코드는 ${AUTH_CODE_LENGTH} 자리이어야 합니다.`
            }))

            return;
        }

        setVerificationCode(Number(code))

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
        setPasswordConfirm(confirmValue);

        const isValid = validator(confirmValue, 'PASSWORD');
        if (!isValid) {
            setErrors(prev => ({
                ...prev,
                passwordConfirm: '비밀번호 형식이 일치하지 않습니다.'
            }));
            return;
        }

        const isValidPasswordConfirm = passwordConfirmValidator(password, confirmValue);
        setErrors(prev => ({
            ...prev,
            passwordConfirm: !isValidPasswordConfirm ? '비밀번호가 서로 일치하지 않습니다.' : ''
        }));
    };





    /** 이메일 중복 확인 */
    const handleEmailCheck = async () => {
        if (errors.email) {
            toast.info("이메일 유효성 통과 후 요청해주세요.");
            return;
        }

        // 이메일 중복 
        const checkResult = await emailCheck({ email });
        setIsCheck(checkResult);

        if (checkResult) {
            toast.success("존재하지 않는 이메일 입니다.");
        } else {
            toast.error("존재하는 이메일 입니다.");
        }
    };

    /** 이메일 인증번호 검증  */
    const handleVerificationCodeCheck = () => {


    }

    /** 이메일 인증번호 발급  */
    const handleSendVerificationCode = () => {
        alert("발송된 번호: " + verificationCode)

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

        const data =  await register(registerRequest);
        setIsLoading(false)

        // 로그인 페이지로 리디렉션
        router(PAGE_URLs.LOGIN_URL)
        
        return data;
    };

    return {
        email,
        password,
        errors,
        isAction,
        isLoading,
        isCheck,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleVerificationCodeChange,
        handleSendVerificationCode,
        handleVerificationCodeCheck,
        handleEmailCheck,
        handleSubmit
    };
};