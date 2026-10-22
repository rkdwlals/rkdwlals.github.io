# 강지민 포트폴리오

GitHub Pages로 바로 올릴 수 있는 정적 사이트입니다. 빌드 과정 없이 `index.html`, `styles.css`, `main.js`, `assets/`만 있으면 됩니다.

## 올리는 방법

1. GitHub에서 새 저장소를 만듭니다. 이름을 `아이디.github.io`로 하면 주소가 `https://아이디.github.io`가 됩니다.
2. 이 폴더의 파일을 전부 저장소 루트에 올립니다. (`.nojekyll` 파일도 같이 올려 주세요.)
3. 저장소의 Settings → Pages에서 Source를 `Deploy from a branch`, 브랜치를 `main`, 폴더를 `/ (root)`로 지정합니다.
4. 1~2분 뒤 주소로 접속해 확인합니다.

## 아직 채워야 할 것

| 위치 | 넣을 파일 | 방법 |
|---|---|---|
| Porta | `assets/video/porta-play.mp4` | `index.html`의 Porta 영역에서 `.slot` 블록을 지우고 주석 처리된 `<video>`를 풉니다. |
| room: 404 영상 | `assets/video/room404-play.mp4` | 같은 방식으로 교체합니다. |
| room: 404 BGM 3곡 | `assets/audio/room404-sample-made.mp3` 외 2곡 | 각 곡 줄의 `파일 준비 중`을 지우고 주석 처리된 `<audio>`를 풉니다. |
| Invite | `assets/video/invite-play.mp4` | Porta와 같은 방식입니다. |
| 가상병실 콘텐츠 | `assets/video/nursing-play.mp4` | Porta와 같은 방식입니다. |
| 연락 | GitHub 프로필 주소 | 맨 아래 주석을 풀고 주소를 넣습니다. |
| 그 밖의 게임 개발 | Gitdesk, What a Scrub 등 | 내용을 확인한 뒤 같은 형식으로 추가합니다. |

플레이 영상은 30초~1분, 1280px 너비, 10MB 이하로 맞추면 GitHub에서도 빠르게 열립니다.

## 타임라인 수정

`main.js` 위쪽의 `LANES` 배열에서 작업을 추가하거나 날짜를 바꿀 수 있습니다. 날짜는 `"YYYY-MM"` 형식이고, `end`를 비우면 한 달짜리 클립이 됩니다. `target`은 클릭했을 때 이동할 섹션의 `id`입니다.

## 영상 관련 안내

ZZZ와 로스트아크 영상은 원본 게임 영상에 사운드만 다시 입힌 작업입니다. 페이지에 원본 영상의 저작권 표기를 넣어 두었습니다. 웹용으로 화면만 다시 압축했고, 소리는 원본 출력 그대로입니다.
