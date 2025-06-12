import { useState } from 'react';
import { FiSend, FiCheck, FiAlertTriangle } from 'react-icons/fi';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // 입력 시 에러 메시지 제거
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = '이름을 입력해주세요.';
        }

        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = '제목을 입력해주세요.';
        }

        if (!formData.message.trim()) {
            newErrors.message = '문의 내용을 입력해주세요.';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = '문의 내용은 최소 10자 이상 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormStatus('submitting');

        // 여기서는 실제 API 호출 대신 타이머로 대체
        setTimeout(() => {
            // 임시로 항상 성공하도록 처리
            setFormStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // 5초 후 폼 상태 초기화
            setTimeout(() => {
                setFormStatus('idle');
            }, 5000);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">문의하기</h1>
            <p className="text-center text-gray-600 mb-10 text-lg">
                민초 서비스에 대한 문의사항이나 제안이 있으신가요? 아래 양식을 작성해 주세요.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                {formStatus === 'success' ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                            <FiCheck className="text-3xl text-green-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">문의가 접수되었습니다</h2>
                        <p className="text-gray-600 mb-6">
                            빠른 시일 내에 입력하신 이메일로 답변 드리겠습니다. 감사합니다.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    이름 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                    disabled={formStatus === 'submitting'}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    이메일 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                    disabled={formStatus === 'submitting'}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                                문의 제목 <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                disabled={formStatus === 'submitting'}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                문의 내용 <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none`}
                                disabled={formStatus === 'submitting'}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                            )}
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium text-lg ${formStatus === 'submitting'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#05D182] hover:bg-[#04b06e]'
                                    } transition-colors`}
                            >
                                {formStatus === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        전송 중...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="mr-2" /> 문의하기
                                    </>
                                )}
                            </button>
                        </div>

                        {formStatus === 'error' && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded mt-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiAlertTriangle className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">
                                            문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">다른 문의 방법</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4">이메일로 문의하기</h3>
                        <p className="text-gray-600 mb-2">
                            직접 이메일을 보내고 싶으신가요? 아래 주소로 연락해 주세요.
                        </p>
                        <a href="mailto:support@mincho.com" className="text-[#05D182] font-medium">
                            support@mincho.com
                        </a>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4">자주 묻는 질문 확인하기</h3>
                        <p className="text-gray-600 mb-4">
                            자주 묻는 질문에서 답변을 찾을 수도 있습니다.
                        </p>
                        <a href="/faq" className="text-[#05D182] font-medium flex items-center">
                            FAQ 바로가기 <span className="ml-2">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
