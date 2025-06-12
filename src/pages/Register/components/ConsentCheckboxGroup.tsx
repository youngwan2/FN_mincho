import React from 'react';

export interface ConsentState {
    essentialInfoConsent: boolean;
    optionalInfoConsent: boolean;
    automaticInfoConsent: boolean;
    marketingConsent: boolean;
}

interface ConsentCheckboxGroupProps {
    consent: ConsentState;
    consentError?: string | null;
    onConsentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenModal: (docId: string) => void;
}

const ConsentCheckboxGroup: React.FC<ConsentCheckboxGroupProps> = ({
    consent,
    consentError,
    onConsentChange,
    onOpenModal,
}) => {
    return (
        <div className="mt-10 mb-6 bg-gray-50 rounded-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">개인정보 수집 및 이용 동의</h3>
            <div className="flex flex-col gap-3">
                {/* 필수 정보 수집 동의 */}
                <label className="flex items-center text-2xl">
                    <input
                        type="checkbox"
                        name="essentialInfoConsent"
                        checked={consent.essentialInfoConsent}
                        onChange={onConsentChange}
                        className="mr-2 w-5 h-5 accent-[#05D182]"
                        required
                    />
                    <span className="font-semibold text-[#05D182]">[필수]</span>&nbsp;
                    <span
                        className="underline cursor-pointer hover:text-[#05D182]"
                        onClick={e => { e.preventDefault(); onOpenModal('privacy-consent'); }}
                        tabIndex={0}
                        role="button"
                        aria-label="이용약관 보기"
                    >
                        이메일, 비밀번호, 닉네임 등 필수 정보 수집 및 이용에 동의합니다.
                    </span>
                </label>
                {consentError && (
                    <p className="text-red-500 text-left text-[14px]">{consentError}</p>
                )}
                {/* 선택 정보 수집 동의 */}
                <label className="flex items-center text-2xl">
                    <input
                        type="checkbox"
                        name="optionalInfoConsent"
                        checked={consent.optionalInfoConsent}
                        onChange={onConsentChange}
                        className="mr-2 w-5 h-5 accent-[#05D182]"
                    />
                    <span className="font-semibold">[선택]</span>&nbsp;
                    <span
                        className="underline cursor-pointer hover:text-[#05D182]"
                        onClick={e => { e.preventDefault(); onOpenModal('privacy-consent'); }}
                        tabIndex={0}
                        role="button"
                        aria-label="개인정보 수집 동의서 보기"
                    >
                        성별, 연령대, 주요 증상 등 선택 정보 수집 및 이용에 동의합니다.
                    </span>
                </label>
                {/* 자동 수집 정보 동의 */}
                <label className="flex items-center text-2xl">
                    <input
                        type="checkbox"
                        name="automaticInfoConsent"
                        checked={consent.automaticInfoConsent}
                        onChange={onConsentChange}
                        className="mr-2 w-5 h-5 accent-[#05D182]"
                    />
                    <span className="font-semibold">[선택]</span>&nbsp;
                    <span
                        className="underline cursor-pointer hover:text-[#05D182]"
                        onClick={e => { e.preventDefault(); onOpenModal('privacy-consent'); }}
                        tabIndex={0}
                        role="button"
                        aria-label="개인정보 수집 동의서 보기"
                    >
                        기기 정보, 브라우저 정보 등 자동 수집 정보 이용에 동의합니다.
                    </span>
                </label>
                {/* 마케팅 정보 수집 동의 */}
                <label className="flex items-center text-2xl">
                    <input
                        type="checkbox"
                        name="marketingConsent"
                        checked={consent.marketingConsent}
                        onChange={onConsentChange}
                        className="mr-2 w-5 h-5 accent-[#05D182]"
                    />
                    <span className="font-semibold">[선택]</span>&nbsp;
                    <span
                        className="underline cursor-pointer hover:text-[#05D182]"
                        onClick={e => { e.preventDefault(); onOpenModal('marketing-consent'); }}
                        tabIndex={0}
                        role="button"
                        aria-label="마케팅정보 수집 동의서 보기"
                    >
                        마케팅 정보 수집 및 활용(이벤트, 혜택 안내 등)에 동의합니다.
                    </span>
                </label>
            </div>
        </div>
    );
};

export default ConsentCheckboxGroup;
