declare global {
  interface Window {
    Kakao: any;
  }
}

export default function ShareButtons(){
  const currentUrl = window.location.href;
  const title = "공유하기 예제";
  const description = "리액트와 타입스크립트로 만든 공유 버튼";
  const imageUrl = "https://your-image-url.com/image.png"; // 공유 이미지 URL

  const shareToNaver = () => {
    const naverUrl = `https://share.naver.com/web/shareView?url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(title)}`;
    window.open(naverUrl, "_blank");
  };

  const shareToKakao = () => {
    if (!window.Kakao) return;
    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      Kakao.init("YOUR_KAKAO_APP_KEY"); // 카카오 앱 키 입력
    }
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
    });
  };

  const shareToUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: currentUrl });
      } catch (error) {
        console.error("공유 실패", error);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("URL이 복사되었습니다.");
    }
  };

  return (
    <div>
      <button onClick={shareToNaver}>네이버 공유</button>
      <button onClick={shareToKakao}>카카오톡 공유</button>
      <button onClick={shareToUrl}>URL 공유</button>
    </div>
  );
};
