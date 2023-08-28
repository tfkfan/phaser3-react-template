export type ValueSetter<T> = (T) => void;

export interface WidgetControl {}

export interface WidgetEvent {}

export interface WidgetControlsEventsMap {
    [controlKey: string]: Array<WidgetEvent>;
}

export interface WidgetControlsMap {
    [controlKey: string]: WidgetControl;
}

export type EventCallback<T extends WidgetControl> = (event: WidgetEvent, control: T) => void

export abstract class ReactControls {
    private controls: WidgetControlsMap = {};
    private events: WidgetControlsEventsMap = {};
    protected register<T extends WidgetControl>(widgetControlKey: string,
                                              widgetControl: T,
                                              eventCallback: EventCallback<T>) {
        if (!widgetControl || !widgetControlKey)
            return;


        this.controls[widgetControlKey] = widgetControl
        while (this.events[widgetControlKey] && this.events[widgetControlKey].length > 0) {
            const evt = this.events[widgetControlKey].shift()
            if (evt) {
                eventCallback(evt, widgetControl)
            }
        }
    }
    protected processEvent<T extends WidgetEvent>(widgetControlKey: string, event: T): Promise<[WidgetControl, T]> {
        const control = this.controls[widgetControlKey]
        if (!control) {
            if(!this.events[widgetControlKey])
                this.events[widgetControlKey] = []
            this.events[widgetControlKey].push(event)
            return Promise.reject()
        }
        return Promise.resolve([control, event])
    }
}