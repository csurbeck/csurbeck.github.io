import { BackToPortfolio } from '@src/components/BackToPortfolio';
import {
    ReorderableTable,
    type ReorderableColumn,
} from '@src/demo_components/ReorderableTable';
import { useEffect, useMemo, useState } from 'react';
import * as stylesImport from './ReorderableTablePage.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

type DemoRow = {
    id: string;
    name: string;
    parent: string;
    type: 'Section' | 'Group' | 'Item';
    status: 'Published' | 'Draft' | 'Hidden';
};

const INITIAL_ROWS: DemoRow[] = [
    { id: '1', name: 'Getting started', parent: '—', type: 'Section', status: 'Published' },
    { id: '2', name: 'Install the SDK', parent: 'Getting started', type: 'Item', status: 'Published' },
    { id: '3', name: 'Authenticate', parent: 'Getting started', type: 'Item', status: 'Published' },
    { id: '4', name: 'Configure workspace', parent: 'Getting started', type: 'Item', status: 'Draft' },
    { id: '5', name: 'Core concepts', parent: '—', type: 'Section', status: 'Published' },
    { id: '6', name: 'Data model', parent: 'Core concepts', type: 'Group', status: 'Published' },
    { id: '7', name: 'Entities', parent: 'Data model', type: 'Item', status: 'Published' },
    { id: '8', name: 'Relationships', parent: 'Data model', type: 'Item', status: 'Draft' },
    { id: '9', name: 'Validation', parent: 'Data model', type: 'Item', status: 'Published' },
    { id: '10', name: 'Permissions', parent: 'Core concepts', type: 'Group', status: 'Published' },
    { id: '11', name: 'Roles', parent: 'Permissions', type: 'Item', status: 'Published' },
    { id: '12', name: 'Scopes', parent: 'Permissions', type: 'Item', status: 'Hidden' },
    { id: '13', name: 'Policies', parent: 'Permissions', type: 'Item', status: 'Draft' },
    { id: '14', name: 'Workflows', parent: '—', type: 'Section', status: 'Published' },
    { id: '15', name: 'Create a flow', parent: 'Workflows', type: 'Item', status: 'Published' },
    { id: '16', name: 'Branching logic', parent: 'Workflows', type: 'Item', status: 'Draft' },
    { id: '17', name: 'Error handling', parent: 'Workflows', type: 'Item', status: 'Published' },
    { id: '18', name: 'Retries & timeouts', parent: 'Workflows', type: 'Item', status: 'Published' },
    { id: '19', name: 'Integrations', parent: '—', type: 'Section', status: 'Draft' },
    { id: '20', name: 'Webhooks', parent: 'Integrations', type: 'Item', status: 'Draft' },
    { id: '21', name: 'API clients', parent: 'Integrations', type: 'Item', status: 'Hidden' },
    { id: '22', name: 'Event streams', parent: 'Integrations', type: 'Item', status: 'Draft' },
    { id: '23', name: 'Observability', parent: '—', type: 'Section', status: 'Published' },
    { id: '24', name: 'Logging', parent: 'Observability', type: 'Item', status: 'Published' },
    { id: '25', name: 'Metrics', parent: 'Observability', type: 'Item', status: 'Published' },
    { id: '26', name: 'Tracing', parent: 'Observability', type: 'Item', status: 'Hidden' },
    { id: '27', name: 'Changelog', parent: '—', type: 'Section', status: 'Published' },
];

function statusClass(status: DemoRow['status']) {
    if (status === 'Published') return styles.statusActive;
    if (status === 'Draft') return styles.statusDraft;
    return styles.statusPaused;
}

export function ReorderableTablePage() {
    const [items, setItems] = useState<DemoRow[]>(INITIAL_ROWS);

    useEffect(() => {
        document.title = 'Claire Surbeck – Reorderable table';
    }, []);

    const columns = useMemo<ReorderableColumn<DemoRow>[]>(
        () => [
            {
                id: 'name',
                header: 'Name',
                cell: (row) => row.name,
                width: '28%',
            },
            {
                id: 'parent',
                header: 'Parent',
                cell: (row) => row.parent,
                width: '26%',
            },
            {
                id: 'type',
                header: 'Type',
                cell: (row) => row.type,
                width: '18%',
            },
            {
                id: 'status',
                header: 'Status',
                cell: (row) => (
                    <span className={`${styles.status} ${statusClass(row.status)}`}>
                        {row.status}
                    </span>
                ),
                width: '16%',
            },
        ],
        [],
    );

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <BackToPortfolio />
                    <h1 className={styles.title}>Reorderable table</h1>
                    <p className={styles.lede}>
                        A keyboard-accessible drag-and-drop table for managing ordered data
                        with hierarchical relationships.
                    </p>
                </header>

                <section className={styles.section} aria-labelledby="problem-heading">
                    <h2 id="problem-heading" className={styles.sectionLabel}>
                        Problem
                    </h2>
                    <p className={styles.sectionBody}>
                        Our internal tables had no drag-and-drop support, but we needed an intuitive
                        way for users to reorder hierarchical data that could contain up to 100 entries.
                        This required a custom solution that enabled
                        a quick flip of rankings between any two entries or broader reordering.
                    </p>
                </section>

                <section className={styles.section} aria-labelledby="approach-heading">
                    <h2 id="approach-heading" className={styles.sectionLabel}>
                        Approach
                    </h2>
                    <p className={styles.sectionBody}>
                        I used a headless drag-and-drop library so I could control the
                        accessible interactions myself, rather than a prebuilt component I
                        couldn&apos;t customize. I supported both a paginated view and a
                        modal view from a single component.
                    </p>
                </section>

                <section className={styles.section} aria-labelledby="try-it-heading">
                    <h2 id="try-it-heading" className={styles.sectionLabel}>
                        Try it
                    </h2>
                    <p className={styles.sectionBody}>
                        Tab to a row and press Space or Enter to pick it up. Use the arrow keys to move the row up
                        or down. Press Space or Enter to drop the row in its new position. Press Escape to drop 
                        the row back in its original position.
                    </p>
                    <div className={styles.demo}>
                        <ReorderableTable
                            title="Hierarchy"
                            items={items}
                            columns={columns}
                            onReorder={setItems}
                            getRowLabel={(row) => row.name}
                        />
                    </div>
                </section>

                {/* <section className={styles.section} aria-labelledby="result-heading">
                    <h2 id="result-heading" className={styles.sectionLabel}>
                        Result / reflection
                    </h2>
                    <p className={styles.sectionBody}>
                        One shared component replaced two, and I&apos;d add undo next.
                    </p>
                </section> */}
                <BackToPortfolio />
            </div>
        </div>
    );
}
