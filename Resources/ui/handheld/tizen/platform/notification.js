function tizen_alarm() {
	var win = Titanium.UI.createWindow(),
	    label_notification = Titanium.UI.createLabel({
			top: 15,
			text: 'enter message'
		}),
		titleInput = Ti.UI.createTextField({
			top: 45,
			left: 10,
			width: '60%',
			height: 30,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		}),
		postButton = Ti.UI.createButton({
			top: 45,
			left: '70%',
			width: '25%',
			height: 30,
			title: 'post'
		}),
		removeButton = Ti.UI.createButton({
			left: 10,
			width: '60%',
			top: 95,
			title: 'Remove all notifications'
		});

	removeButton.addEventListener('click', function() {
		Ti.Tizen.Notification.removeAll();
	});

	postButton.addEventListener('click', createNotification);

	function createNotification() {
		var appService = Ti.Tizen.Application.createApplicationService({
				operation: 'http://tizen.org/appcontrol/operation/default',
				uri: null
			}),
			// Create notification`s parameters
			notificationDict = {
				content: titleInput.value,
				vibration: true, 
				service: appService
			},
			// Create and post notification
			notification = Ti.Tizen.Notification.createStatusNotification({
				statusType: 'SIMPLE',
				title: 'Simple notification',
				notificationInitDict: notificationDict
			});

		Ti.Tizen.Notification.post(notification);
		titleInput.value = '';
	}

	win.add(removeButton);
	win.add(label_notification);
	win.add(titleInput);
	win.add(postButton);

	return win;
}

module.exports = tizen_alarm;