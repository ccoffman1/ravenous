const clientId = 'qZsw3eqAFORIaxYwO8ky_A';
const secret = 'GplyjB7oDrVxo2VAtQWwig8bPm7Z8nuZbnkeheglgKrOgcqsvMXbuNYSsa054i5Y';

let accessToken = '';

const Yelp = {
    getAccessToken(){
        if (accessToken) {
            return new Promise(resolve => {resolve(accessToken)});
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,{
            method: 'POST'}).then(response => { if (response.ok) { return response.json();
            }throw new Error('Network response was not ok.');}).then(jsonResponse => { accessToken = jsonResponse.access_token;});
    },

    search(term,location,sortBy){
        return Yelp.getAccessToken().then(() => {return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{method:'GET',headers:{Authorization: `Bearer ${accessToken}`}}
    ).then(response => { if (response.ok) { return response.json();
    }throw new Error('Network response was not ok.');}).then(jsonResponse => {if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
            return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address,
                city: business.location.city,
                state: business.location.state_code,
                zipCode: location.postal_code,
                category: business.categories.title,
                rating: business.rating,
                reviewCount: business.review_count
            }
    });
    }});

    }
        )}}

export default Yelp;

