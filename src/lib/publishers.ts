/*
 * Publisher lookups used by the static catalog pages.
 * The data layer exposes a narrow, database-agnostic view of publisher records so
 * Astro pages can render data without depending on Drizzle row shapes.
 */

import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Database } from './db';
import type { Publisher } from '../types/game';

/**
 * Get all publishers in alphabetical order using the stable fields required by the catalog UI.
 *
 * @param db - The injectable Drizzle database client.
 * @returns A promise resolving to publisher records with `id` and `name` only.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
