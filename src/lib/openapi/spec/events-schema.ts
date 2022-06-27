import { FromSchema } from 'json-schema-to-ts';
import { eventSchema } from './event-schema';
import { includeSchemasRecursively } from '../nested-schemas';

export const eventsSchema = {
    $id: '#/components/schemas/eventsSchema',
    type: 'object',
    additionalProperties: false,
    required: ['version', 'events'],
    properties: {
        version: {
            type: 'integer',
            minimum: 1,
        },
        events: {
            type: 'array',
            items: { $ref: eventSchema.$id },
        },
    },
    components: {
        schemas: includeSchemasRecursively({
            eventSchema,
        }),
    },
} as const;

export type EventsSchema = FromSchema<typeof eventsSchema>;
