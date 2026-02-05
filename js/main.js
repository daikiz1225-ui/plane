import { Settings } from './settings.js';
import { searchVideos } from './api.js';
import { UI } from './ui.js';
import { getEmbedHtml, extractVideoId } from './converter.js';

// 設定モーダル制御
const modal = document.getElementById('settingsModal');
document.getElementById('openSettings').onclick = () => {
    const data = Settings.load();
    document.getElementById('apiKeyInput').value = data.apiKey;
    document.getElementById('userNameInput').value = data.userName;
    modal.style.display = 'flex';
};
document.getElementById('closeSettings').onclick = () => modal.style.display = 'none';
document.getElementById('saveSettings').onclick = () => {
    Settings.save(document.getElementById('apiKeyInput').value, document.getElementById('userNameInput').value);
    modal.style.display = 'none';
    alert("保存しました");
};

// 検索・再生ロジック
async function doSearch() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    // 直接URLが入れられた場合
    const directId = extractVideoId(query);
    if (directId) {
        playVideo(directId, "再生中の動画");
        return;
    }

    // キーワード検索の場合
    UI.switchView('list');
    UI.showLoading();
    try {
        const videos = await searchVideos(query);
        UI.renderList(videos, playVideo);
    } catch (e) {
        alert("エラー: " + e.message);
    }
}

function playVideo(id, title) {
    UI.switchView('watch');
    document.getElementById('playerArea').innerHTML = getEmbedHtml(id);
    document.getElementById('videoTitle').innerText = title;
}

document.getElementById('searchBtn').onclick = doSearch;
document.getElementById('homeBtn').onclick = () => UI.switchView('list');
