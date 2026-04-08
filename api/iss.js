export async function getISSPosition() {
    const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await res.json();
    return {
        lat: parseFloat(data.latitude),
        lon: parseFloat(data.longitude)
    };
}