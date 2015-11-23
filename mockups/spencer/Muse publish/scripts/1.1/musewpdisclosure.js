/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2012 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function(a,c,b){b.Plugins.TabbedPanelsPlugin={defaultOptions:{widgetClassName:"TabbedPanelsWidget",tabClassName:"TabbedPanelsTab",tabHoverClassName:"TabbedPanelsTabHover",tabDownClassName:"TabbedPanelsTabDown",tabActiveClassName:"TabbedPanelsTabSelected",panelClassName:"TabbedPanelsContent",panelActiveClassName:"TabbedPanelsContentVisible",defaultPanel:0,canCloseAll:!1},initialize:function(b,d){var g=this;a.extend(d,a.extend({},g.defaultOptions,d));c.Widget.Disclosure.DisplayPropertyTransitionPlugin.initialize(b,
d);b.bind("attach-behavior",function(){g._attachBehavior(b)})},_attachBehavior:function(a){var b=a.tabs?a.tabs.$element:null;if(b&&(b.first().addClass("TabbedPanelsTabFirst"),b.last().addClass("TabbedPanelsTabLast"),a.options.event!=="click"))b.on(a.options.event,function(){a.tabs.selectTab(this)})}};b.Plugins.AccordionPlugin={defaultOptions:{widgetClassName:"AccordionWidget",tabClassName:"AccordionPanelTab",tabHoverClassName:"AccordionPanelTabHover",tabDownClassName:"AccordionPanelTabDown",tabActiveClassName:"AccordionPanelTabOpen",
panelClassName:"AccordionPanelContent",panelActiveClassName:"AccordionPanelContentActive",defaultPanel:0,canCloseAll:!1,transitionDirection:"vertical"},initialize:function(b,d){var g=this;a.extend(d,a.extend({},g.defaultOptions,d));d.defaultIndex=d.defaultPanel;d.toggleStateEnabled=d.canCloseAll;c.Widget.Disclosure.AccordionTransitionPlugin.initialize(b,d);b.bind("transform-markup",function(){g._transformMarkup(b)});b.bind("attach-behavior",function(){g._attachBehavior(b)})},_transformMarkup:function(a){var b=
a.$element[0];c.scopedFind(b,".AccordionPanelContent",a.options.widgetClassName,b).removeClass("AccordionPanelContent colelem").wrap('<div class="AccordionPanelContent colelem"><div class="AccordionPanelContentClip"></div></div>').closest(".AccordionPanelContent").css({width:"100%",position:"relative"})},_attachBehavior:function(a){var b=a.$element[0],a=a.options,g=0,h=a.transitionDirection==="vertical",i=h?"offsetWidth":"offsetHeight",j=h?"width":"height";c.scopedFind(b,".AccordionPanel",a.widgetClassName,
b).each(function(){g=g<this[i]?this[i]:g}).each(function(){g>this[i]&&(this.style[j]=g+"px")})}};c.Widget.TabbedPanels.prototype.defaultPlugins=[b.Plugins.TabbedPanelsPlugin];c.Widget.Accordion.prototype.defaultPlugins=[b.Plugins.AccordionPlugin]})(jQuery,WebPro,Muse,window);
