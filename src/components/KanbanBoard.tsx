'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { columnsFromBackend } from '../data/mockData';

type Ticket = {
    id: string;
    Task: string;
    Due_Date: string;
};

type Column = {
    title: string;
    items: Ticket[];
};

type Columns = {
    [key: string]: Column;
};

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<Columns>(columnsFromBackend);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsBrowser(true);
        }
    }, []);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // 드롭 대상이 없을 경우 함수 종료
        if (!destination) return;

        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];

        const sourceItems = [...sourceColumn.items];
        const destinationItems =
            source.droppableId === destination.droppableId ? sourceItems : [...destinationColumn.items];

        // 드래그한 항목 제거 및 삽입
        const [removed] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, removed);

        // 상태 업데이트
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            ...(source.droppableId !== destination.droppableId && {
                [destination.droppableId]: {
                    ...destinationColumn,
                    items: destinationItems,
                },
            }),
        });

        setIsDragging(false);
    };

    return (
        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {isBrowser ? (
                <>
                    {Object.entries(columns)?.map(([columnId, column]) => (
                        <Droppable
                            droppableId={columnId}
                            key={`droppable-${columnId}`}
                            isDropDisabled={false}
                            isCombineEnabled={false}
                            ignoreContainerClipping
                            direction="vertical"
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        margin: '0 10px',
                                        width: '500px',
                                        minHeight: '400px',
                                        padding: '40px',
                                        background: snapshot.isDraggingOver
                                            ? '#d3d3d3'
                                            : isDragging
                                            ? '#0000ff'
                                            : '#f0f0f0',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                >
                                    <h3 style={{ userSelect: 'none' }}>{column.title.toUpperCase()}</h3>
                                    {column.items.map((ticket, index) => (
                                        <Draggable
                                            key={ticket.id}
                                            draggableId={ticket.id}
                                            index={index}
                                            isDragDisabled={column.title === 'Done'}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        padding: '10px',
                                                        margin: '0 0 10px 0',
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        zIndex: snapshot.isDraggingOver ? -1 : 1,
                                                        userSelect: 'none', // 텍스트 선택 방지
                                                        cursor: snapshot.isDraggingOver ? 'grabbing' : 'grab',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <h4>{ticket.id}</h4>
                                                    <p>{ticket.Task}</p>
                                                    <p>{ticket.Due_Date}</p>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </>
            ) : null}
        </DragDropContext>
    );
};

export default KanbanBoard;
