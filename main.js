//i-need-space





document.querySelector('#search').addEventListener('click', async function(){

    let api_key = document.querySelector('#api-key').value;
    let address = document.querySelector('#address').value;

    let httpResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${api_key}`);
    let map_data = await httpResponse.json();

    console.log(map_data);

    let lat = map_data.features[0].center[1];
    let lon = map_data.features[0].center[0];

    let norad = document.querySelector('#norad').value;

    httpResponse = await fetch(`https://api.groundtrack.space/passes/${norad}?lat=${lat}&lon=${lon}`);
    let sat_data = await httpResponse.json();

    console.log(sat_data);

    let date = sat_data[0].rise.utc_datetime.slice(0, 9);
    let time = sat_data[0].rise.utc_datetime.slice(11, 16);

    document.querySelector('.content').style['display'] = 'none';
    document.querySelector('#result').style['display'] = 'flex';

    document.querySelector('#result_text').innerText = `That satelite will rise in ${address} on ${date} at ${time}`

    document.querySelector('#again_button').addEventListener('click', function(){

        document.querySelector('#result').style['display'] = 'none';
        document.querySelector('.content').style['display'] = 'flex';

        // document.querySelectorAll('input').forEach(function(x){x.value ='';})
    })




})