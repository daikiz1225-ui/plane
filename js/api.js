import { Settings } from './settings.js';

export async function searchVideos(query) {
    const { apiKey } = Settings.load();
    if (!apiKey) throw new Error("APIキーが設定されていません");

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=12&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) throw new Error(data.error.message);
    return data.items;
}
