import React, { useState, useEffect, useRef, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import ColorHash from 'color-hash';
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from "../../services/servise";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const colorHash = new ColorHash();

const DragAndDropCalendar = withDragAndDrop(Calendar)

export const ShiftCalendar = (props) => {
    const employees = props.employees
    const myShifts = props.shifts
    const eventsData = props.eventsData
    const setEventsData = props.setEventsData
    const selectWorkerRef = props.selectWorkerRef
    const isEditShifts = props.isEditShifts

    const formats = {
        //chenge the display time in left column
        timeGutterFormat: 'HH:mm',
        //chage the display time of selected slot
        selectRangeFormat: ({ start, end }, culture, localizer) =>
            `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
        //chage the display time of event
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,

    }
    useEffect(() => {
        if(myShifts!=null)
        addEvents(myShifts)
    

    }, [myShifts])
    const addEvents = (newEvents) => {
        const newEventsWithDates = newEvents.map(event => {
            const newEvent = {...event, start: new Date(event.start), end: new Date(event.end)}
            // console.log(newEvent)
            return newEvent;
        });
        setEventsData((prev) => [...prev, ...newEventsWithDates])
    };
    const eventPropGetter = (event) => {
        // if the id is type number then you need to convert it to string

        return {

            style: {
                backgroundColor: colorHash.hex(event.employee._id.toString()),
            },
        };
    };

    const handleEventResize = useCallback(
        ({ event, start, end }) => {
            setEventsData((prev) => {
                // Find the existing event
                const existing = prev.find((ev) => ev.id === event.id) ?? {}

                // Check if there is another event of the same person in the time period in question
                const conflictingEvent = prev.find(
                    (ev) => ev.person === existing.person && ev.id !== existing.id && (
                        (ev.start >= start && ev.start < end) ||
                        (ev.end > start && ev.end <= end) ||
                        (ev.start <= start && ev.end >= end)
                    )
                )

                if (conflictingEvent) {
                    // If there is a conflicting event, do not update the events data
                    return prev
                } else {
                    // If there is no conflicting event, update the events data
                    const filtered = prev.filter((ev) => ev.id !== event.id)
                    return [...filtered, { ...existing, start, end }]
                }
            })
        },
        [setEventsData]
    )

    //handle move event
    const moveEvent = useCallback(
        ({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }

            setEventsData((prev) => {
                // Find the existing event
                const existing = prev.find((ev) => ev.id === event.id) ?? {}

                // Check if there is another event of the same person in the time period in question
                const conflictingEvent = prev.find(
                    (ev) => ev.person === existing.person && ev.id !== existing.id && (
                        (ev.start >= start && ev.start < end) ||
                        (ev.end > start && ev.end <= end) ||
                        (ev.start <= start && ev.end >= end)
                    )
                )

                if (conflictingEvent) {
                    // If there is a conflicting event, do not update the events data
                    return prev
                } else {
                    // If there is no conflicting event, update the events data
                    const filtered = prev.filter((ev) => ev.id !== event.id)
                    return [...filtered, { ...existing, start, end, resourceId, allDay }]
                }
            })
        },
        [setEventsData]
    )

    // handle select slot
    const handleSelect = ({ start, end }) => {
        if (isEditShifts) {

            console.log(start);
            console.log(end);
            let tmp
            employees.map((employee) => {
                if (employee._id == selectWorkerRef.current.value)
                    tmp = employee
            })
            if (tmp) {
                let slotArray = eventsData.filter((shift) => (shift.start <= start && start <= shift.end || shift.start <= end && end <= shift.end || shift.start > start && shift.end < end));
                console.log(slotArray.length);
                if (slotArray.filter((shift) => shift.employee == tmp).length == 0) {
                    setEventsData([
                        ...eventsData,
                        {
                            id: tmp.fullName.firstName + start,
                            start,
                            end,
                            title: `${tmp.fullName.firstName} ${tmp.fullName.lastName} `,
                            employee: tmp,

                        }
                    ]);
                }
            }
        }
    };
    //delete event on double click
    const handleEventDoubleClick = useCallback((event) => {
        console.log(event)
        setEventsData((prev) => prev.filter((ev) => ev.id !== event.id))
    }, [setEventsData])
  

    return (
        <div className="">
          
            <DragAndDropCalendar
                views={["day", "agenda", "week", "month"]}
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                formats={formats}
                events={eventsData}
                eventPropGetter={eventPropGetter}
                resizable={isEditShifts?true:false}
                onEventResize={isEditShifts?handleEventResize:false}
                selectable={isEditShifts?true:false}
                onEventDrop={isEditShifts?moveEvent:false}
                onDoubleClickEvent={isEditShifts?handleEventDoubleClick:false}


                // style={{ height: "100vh" }}
                // onSelectEvent={(event) => window.confirm("delete the shift ?")?delEvent(event.id):alert("not deleted")}
                onSelectSlot={handleSelect}
            />
        </div>
    );
}
