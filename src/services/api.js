var domain = 'http://localhost:3001';

export default async function API(method,data = {}) {
    if(method == '/get_data') {
        try {
			console.log('API: ',domain+method,data);
			let res = await fetch(domain+method,{
				method: 'POST',
				headers: {
					'Accept':		'application/json',
					'Content-Type':	'application/json',
				},
				body: JSON.stringify(data),
			});
			console.log(res);
			if(res.status == 200) {
				let data = await res.json();
				return {response:data.response};
			} else if(res.status == 500) {
				return {error:{code:res.status,message:'Сервер не доступен'}};
			} else {
				console.log(res);
				return {error:{code:res.status,message:'Проблемы со связью'}};
			}
        } catch (e) {
			console.log(e);
			return {error:{message:'Не удалось совершить запрос'}};
		}
    }
}
