export default ({ role, userId }, { message, receiverId, accommodation }) => {
	message = ` ${message} `;
	const mentioned = new RegExp(` @(${role}|here) `, 'ig').test(message);
	if (!receiverId) {
		if ((accommodation && accommodation.userid === userId) || mentioned) {
			return true;
		}
		return false;
	}
	return true;
};
