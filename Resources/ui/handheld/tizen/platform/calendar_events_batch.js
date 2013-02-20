function events_batch(args) {
	var  ADD_BATCH = 1,
		 UPDATE_BATCH = 2,
		 DELETE_BATCH = 3;

	var self = Ti.UI.createWindow({
			title: args.title
		}),
		calendar = Ti.Tizen.Calendar.getDefaultCalendar('EVENT'),
		data = [
			{ title: 'Add three events', test: ADD_BATCH },
			{ title: 'Update last three events', test: UPDATE_BATCH },
			{ title: 'Delete last three events', test: DELETE_BATCH }
		],
		tableview = Ti.UI.createTableView({
			rowHeight: 40,
			top: 120
		}),
		summaryLabel = Ti.UI.createLabel({
			text: 'Summary',
			width: '30%',
			left: 0,
			heigh: 40,
			top: 10
		}),
		summaryInput = Ti.UI.createTextField({
			left: '40%',
			width: '50%',
			height: 20,
			top: 10,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});

	self.add(summaryLabel);
	self.add(summaryInput);

	tableview.addEventListener('click', function(e) {
		if (e.rowData.test) {
			switch (e.rowData.test) {
				case ADD_BATCH: 
					addBatch();
					break;
				case UPDATE_BATCH:
					updateBatch();
					break;
				case DELETE_BATCH:
					deleteBatch();
			}
		}
	});

	tableview.data = data;

	self.add(tableview);

	function addBatch() {
		var value = summaryInput.value.trim(),
			eventsArr = [];

		if (!value) {
			alert('Please enter summary');
			return ;
		}

		eventsArr[0] = Ti.Tizen.createCalendarEvent({
			summary : value,
			startDate : Ti.Tizen.Time.getCurrentDateTime(),
			duration : Ti.Tizen.createTimeDuration({
				length: 1, 
				unit: 'HOURS'
			}),
		});
		eventsArr[1] = eventsArr[0].clone();
		eventsArr[1].summary += ' copy 1';
		eventsArr[2] = eventsArr[0].clone();
		eventsArr[2].summary += ' copy 2';

		calendar.addBatch(eventsArr, function() {
			summaryInput.value = '';
			alert('Events were added successfully');
		}, onError);

	}

	function updateBatch() {
		var value = summaryInput.value.trim();
		if (!value) {
			alert('Please enter summary');
			return ;
		}
		calendar.find(function(events) {
			var eventsArr = [],
				i = events.length - 1,
				j = 0;

			if (i < 2) {
				alert('You should have at least three events. Now you have ' + events.length + ' events');
				return ;
			}

			for (; i >= 0, j < 3; i--, j++) {
				events[i].summary = value;
				eventsArr.push(events[i]);
			}
			calendar.updateBatch(eventsArr, function() {
				summaryInput.value = '';
				alert('Events were updated successfully');
			}, onError)
		}, onError)	
	}

	function deleteBatch() {
		calendar.find(function(events) {
			var eventsArr = [],
				i = events.length - 1,
				j = 0;

			if (i < 2) {
				alert('You should have at least three events. Now you have ' + events.length + ' events');
				return ;
			}

			for (; i >= 0 && j < 3; i--, j++) {
				eventsArr.push(events[i].id);
			}
			try {
				calendar.removeBatch(eventsArr, function() {
					alert('Events were removed successfully');
				}, onError);
			} catch (err) {
				alert('Exception: ' + err.message);
			}
		}, onError)
	}

	function onError(err) {
		alert('Error: ' + err.message);
	}

	return self;
}
module.exports = events_batch;