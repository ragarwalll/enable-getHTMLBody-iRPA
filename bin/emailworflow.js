
// ----------------------------------------------------------------
//   Test menu for scenario EmailWorflow 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'EmailWorflow', 'Test EmailWorflow', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.EmailWorflow.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario EmailWorflow Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: EmailWorflow
// ----------------------------------------------------------------
GLOBAL.scenario({ EmailWorflow: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Init_Outlook, GLOBAL.steps.Custom);
	sc.step(GLOBAL.steps.Custom, null);
}}, ctx.dataManagers.rootData).setId('3fd57d99-6ace-49a0-8bf3-afd7ce732568') ;

// ----------------------------------------------------------------
//   Step: Init_Outlook
// ----------------------------------------------------------------
GLOBAL.step({ Init_Outlook: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('EmailWorflow', '5e51cc9a-89d1-446f-ba38-8438ef016726') ;
	// Initialize Outlook
	ctx.outlook.init();
	sc.endStep(); // Custom
	return;
}});

// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ Custom: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('EmailWorflow', 'ca394536-e667-4247-a3df-b67922569397') ;
	// Describe functionality to be implemented in JavaScript later in the project.

	//Get Mail Body as HTML
	ctx.outlook.note.resetNoteCollection();
	ctx.outlook.mail.searchByCriteria({
        subject: "Coffee%",
        dontThrowExceptionIfNoMailFound: true
    });
	var mails = ctx.outlook.mail.getFilteredTable();
	if(mails.length) {
		ctx.outlook.mail.retrieveMail({EntryID : mails[0]['EntryID'], StoreID : mails[0]['StoreID']});
		var body = ctx.outlook.mail.getHTMLBody( 0 ); //this is store the mail body as html inside variable body
		ctx.log("Mail Body as HTML -> " + body);
	}
	
	//Get Mail Body as Text
	ctx.outlook.note.resetNoteCollection();
	ctx.outlook.mail.searchByCriteria({
        subject: "sap",
        dontThrowExceptionIfNoMailFound: true
    });
	var mails = ctx.outlook.mail.getFilteredTable();
	if(mails.length) {
		ctx.outlook.mail.retrieveMail({EntryID : mails[0]['EntryID'], StoreID : mails[0]['StoreID']});
		var body = ctx.outlook.mail.getBody( 0 ); //this is store the mail body as html inside variable body
		ctx.log("Mail Body as Text -> " + body);
	}
	
	sc.endStep(); // end Scenario
	return;
}});
