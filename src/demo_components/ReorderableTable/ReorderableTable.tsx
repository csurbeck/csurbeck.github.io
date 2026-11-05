import {
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    type CSSProperties,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import * as stylesImport from './ReorderableTable.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

const DEFAULT_PAGE_SIZE = 10;

export type ReorderableColumn<T> = {
    id: string;
    header: string;
    cell: (row: T) => ReactNode;
    width?: string | number;
};

export type ReorderableTableProps<T extends { id: string }> = {
    items: T[];
    columns: ReorderableColumn<T>[];
    onReorder: (items: T[]) => void;
    pageSize?: number;
    title?: string;
    getRowLabel?: (row: T) => string;
};

type SortableRowProps<T extends { id: string }> = {
    item: T;
    order: number;
    columns: ReorderableColumn<T>[];
    getRowLabel?: (row: T) => string;
};

function DragHandle() {
    return (
        <span className={styles.dragHandle} aria-hidden="true">
            <span />
            <span />
            <span />
        </span>
    );
}

function SortableRow<T extends { id: string }>({
    item,
    order,
    columns,
    getRowLabel,
}: SortableRowProps<T>) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const label = getRowLabel?.(item) ?? String(item.id);

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className={`${styles.row} ${isDragging ? styles.rowDragging : ''}`}
        >
            <td className={styles.handleCell}>
                <button
                    type="button"
                    className={styles.handleButton}
                    aria-label={`Reorder ${label}`}
                    {...attributes}
                    {...listeners}
                >
                    <DragHandle />
                </button>
            </td>
            <td className={`${styles.cell} ${styles.orderCell}`}>{order}</td>
            {columns.map((column) => (
                <td
                    key={column.id}
                    className={styles.cell}
                    style={column.width != null ? { width: column.width } : undefined}
                >
                    {column.cell(item)}
                </td>
            ))}
        </tr>
    );
}

type TableBodyProps<T extends { id: string }> = {
    items: T[];
    orderById: Map<string, number>;
    columns: ReorderableColumn<T>[];
    getRowLabel?: (row: T) => string;
};

function TableBody<T extends { id: string }>({
    items,
    orderById,
    columns,
    getRowLabel,
}: TableBodyProps<T>) {
    return (
        <>
            {items.map((item) => (
                <SortableRow
                    key={item.id}
                    item={item}
                    order={orderById.get(item.id) ?? 0}
                    columns={columns}
                    getRowLabel={getRowLabel}
                />
            ))}
        </>
    );
}

export function ReorderableTable<T extends { id: string }>({
    items,
    columns,
    onReorder,
    pageSize = DEFAULT_PAGE_SIZE,
    title = 'Items',
    getRowLabel,
}: ReorderableTableProps<T>) {
    const titleId = useId();
    const [page, setPage] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(page, totalPages - 1);

    useEffect(() => {
        if (page !== safePage) {
            setPage(safePage);
        }
    }, [page, safePage]);

    const pageItems = useMemo(() => {
        const start = safePage * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, pageSize, safePage]);

    const visibleItems = isExpanded ? items : pageItems;
    const sortableIds = useMemo(
        () => visibleItems.map((item) => item.id),
        [visibleItems],
    );
    const orderById = useMemo(() => {
        const map = new Map<string, number>();
        items.forEach((item, index) => {
            map.set(item.id, index + 1);
        });
        return map;
    }, [items]);

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            if (oldIndex < 0 || newIndex < 0) return;

            onReorder(arrayMove(items, oldIndex, newIndex));
        },
        [items, onReorder],
    );

    const openExpanded = useCallback(() => setIsExpanded(true), []);
    const closeExpanded = useCallback(() => setIsExpanded(false), []);

    useEffect(() => {
        if (!isExpanded) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeExpanded();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [closeExpanded, isExpanded]);

    const renderTable = () => (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={sortableIds}
                strategy={verticalListSortingStrategy}
            >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.handleHeader} scope="col">
                                <span className={styles.srOnly}>Reorder</span>
                            </th>
                            <th className={`${styles.headerCell} ${styles.orderHeader}`} scope="col">
                                Order
                            </th>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    scope="col"
                                    className={styles.headerCell}
                                    style={
                                        column.width != null
                                            ? { width: column.width }
                                            : undefined
                                    }
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <TableBody
                            items={visibleItems}
                            orderById={orderById}
                            columns={columns}
                            getRowLabel={getRowLabel}
                        />
                    </tbody>
                </table>
            </SortableContext>
        </DndContext>
    );

    const pagination =
        !isExpanded && items.length > pageSize ? (
            <div className={styles.pagination}>
                <button
                    type="button"
                    className={styles.pageButton}
                    onClick={() => setPage(0)}
                    disabled={safePage === 0}
                    aria-label="First page"
                >
                    {'|<'}
                </button>
                <button
                    type="button"
                    className={styles.pageButton}
                    onClick={() => setPage((current) => Math.max(0, current - 1))}
                    disabled={safePage === 0}
                    aria-label="Previous page"
                >
                    {'<'}
                </button>
                <span className={styles.pageStatus}>
                    Page {safePage + 1} of {totalPages}
                </span>
                <button
                    type="button"
                    className={styles.pageButton}
                    onClick={() =>
                        setPage((current) => Math.min(totalPages - 1, current + 1))
                    }
                    disabled={safePage >= totalPages - 1}
                    aria-label="Next page"
                >
                    {'>'}
                </button>
                <button
                    type="button"
                    className={styles.pageButton}
                    onClick={() => setPage(totalPages - 1)}
                    disabled={safePage >= totalPages - 1}
                    aria-label="Last page"
                >
                    {'>|'}
                </button>
            </div>
        ) : null;

    const toolbar = (
        <div className={styles.toolbar}>
            <div className={styles.toolbarMeta}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.count}>
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
            </div>
            {!isExpanded && items.length > pageSize ? (
                <button
                    type="button"
                    className={styles.expandButton}
                    onClick={openExpanded}
                >
                    Expand all
                </button>
            ) : null}
        </div>
    );

    const modal =
        isExpanded && typeof document !== 'undefined'
            ? createPortal(
                  <div className={styles.modalRoot}>
                      <div
                          className={styles.scrim}
                          role="presentation"
                          onMouseDown={closeExpanded}
                      />
                      <div
                          className={styles.modal}
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby={titleId}
                      >
                          <div className={styles.modalHeader}>
                              <div className={styles.toolbarMeta}>
                                  <h3 id={titleId} className={styles.title}>
                                      {title}
                                  </h3>
                                  <span className={styles.count}>
                                      {items.length}{' '}
                                      {items.length === 1 ? 'item' : 'items'}
                                  </span>
                              </div>
                              <button
                                  type="button"
                                  className={styles.closeButton}
                                  onClick={closeExpanded}
                              >
                                  Close
                              </button>
                          </div>
                          <div className={styles.modalBody}>{renderTable()}</div>
                      </div>
                  </div>,
                  document.body,
              )
            : null;

    return (
        <div className={styles.root}>
            {toolbar}
            <div className={styles.tableShell}>
                {!isExpanded ? renderTable() : null}
            </div>
            {pagination}
            {modal}
        </div>
    );
}
