/**
 * @class Response
 * @desc utils for api response
 */
class AppResponse {

	/**
	 * @desc send response
	 * 
	 * @param {Response} res
	 * @param {Int} status_code 
	 * @param {String} status - success | fail 
	 * @param {JSON|String} data
	 */
	static sendResponse(res, status_code, data){

		let status = 'success';

		if (`${status}`.startsWith('5')){
			status = 'error';
		}

		if (`${status}`.startsWith('4')){
			status = 'fail';
		}

		if (typeof data == 'object'){
			return res.status(status_code).json({
				status,
				data
			});
		}

		return res.status(status_code).json({
			status,
			message: data
		})
		
	}

}

module.exports = AppResponse;