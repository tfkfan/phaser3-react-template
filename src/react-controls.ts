export type ValueSetter<T> = (T) => void;

export interface WidgetControl {
}

export interface WidgetControlsMap {
    [controlKey: string]: WidgetControl;
}

export abstract class ReactControls {
    private controls: WidgetControlsMap = {};

    protected register<T extends WidgetControl>(widgetControlKey: string,
                                                widgetControl: T) {
        if (!widgetControl || !widgetControlKey)
            return;
        this.controls[widgetControlKey] = widgetControl
    }

    protected getControl(widgetControlKey: string): WidgetControl {
        return this.controls[widgetControlKey]
    }
}