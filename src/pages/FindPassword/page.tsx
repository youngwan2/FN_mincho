import { Fragment, useState } from 'react';
import StepIndicator from './components/StepIndicator';
import StepEmailInput from './components/StepEmailInput';
import StepVerification from './components/StepVerification';
import StepSuccess from './components/StepSuccess';
import { sendVerificationCode, verificationCodeCheck } from '../../service/auth';
import { Link } from 'react-router';
import Logo from '../../components/icon/Logo';

export default function FindPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // 이메일 검증 및 인증번호 발송
    const handleEmailSubmit = async () => {
        setError('');


        if (!email) return setError('이메일을 입력해주세요');

        try {
            setIsLoading(true);
            const success = await sendVerificationCode(email, "reset");
            if (success) {
                setStep(2);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 인증번호 검증
    const handleVerificationSubmit = async () => {
        setError('');


        if (!verificationCode) return setError('인증 코드를 입력해주세요');

        try {
            setIsLoading(true);
            const success = await verificationCodeCheck(email, verificationCode, "reset");
            if (success) {
                setStep(3);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-[768px] w-full relative">
            <Link title="사이트 로고, 클릭 시 홈페이지로" className="absolute left-5 top-10" to={"/"}>
                <Logo />
            </Link>

            {/* 비밀번호 찾기 헤더 */}
            <div className="sm:mx-auto w-full">
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">비밀번호 찾기</h2>
                <StepIndicator step={step} />
            </div>

            {/* 검증 폼 */}
            <div className="mt-8 sm:mx-auto w-full">
                <div className="bg-white py-8 px-4 sm:px-10">
                    {/* 이메일 검증 및 인증번호 발송 */}
                    {step === 1 && (
                        <StepEmailInput
                            email={email}
                            error={error}
                            isLoading={isLoading}
                            onChange={setEmail}
                            onSubmit={handleEmailSubmit}
                        />
                    )}

                    {/* 인증번호 검증 */}
                    {step === 2 && (
                        <StepVerification
                            email={email}
                            code={verificationCode}
                            error={error}
                            isLoading={isLoading}
                            onChange={setVerificationCode}
                            onSubmit={handleVerificationSubmit}
                            onBack={() => setStep(1)}
                        />
                    )}

                    {/* 비밀번호 변경 페이지 링크 발송 */}
                    {step === 3 && <StepSuccess email={email} onReset={() => setStep(1)} />}
                </div>
            </div>
        </div>
    );
}
