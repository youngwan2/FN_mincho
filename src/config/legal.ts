
interface LegalDocument {
    id: string;
    title: string;
    description: string;
    path: string;
}

export const legalDocuments: LegalDocument[] = [
    {
        id: 'privacy-policy',
        title: '개인정보처리방침',
        description: '사용자의 개인정보 수집, 이용, 관리에 대한 정책입니다.',
        path: '/docs/privacy-policy.html',
    },
    {
        id: 'terms-of-service',
        title: '이용약관',
        description: '민초 서비스 이용에 관한 약관입니다.',
        path: '/docs/terms-of-service.html',
    },
    {
        id: 'marketing-consent',
        title: '마케팅정보 수집 동의서',
        description: '마케팅 목적의 정보 수집 및 이용에 관한 동의서입니다.',
        path: '/docs/marketing-consent.html',
    },
    {
        id: 'youth-policy',
        title: '청소년보호정책',
        description: '청소년 보호를 위한 서비스 운영 정책입니다.',
        path: '/docs/youth-policy.html',
    },
    {
        id: 'legal-notice',
        title: '법적고지',
        description: '서비스 이용 관련 법적 고지사항입니다.',
        path: '/docs/legal-notice.html',
    },
    {
        id: 'privacy-consent',
        title: '개인정보 수집 및 이용 동의서',
        description: '서비스 제공을 위한 개인정보 수집 및 이용에 대한 동의서입니다.',
        path: '/docs/privacy-consent.html',
    }
];
