var JSON_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/object1607216913.json',
  title: 'Root',
  type: 'array',
  default: [],
  items: {
    $id: '#root/items',
    title: 'Items',
    type: 'object',
    required: ['id', 'domain', 'visitors', 'date'],
    properties: {
      id: {
        $id: '#root/items/id',
        title: 'Id',
        type: 'object',
        required: ['$oid'],
        properties: {
          $oid: {
            $id: '#root/items/id/$oid',
            title: '$oid',
            type: 'string',
            default: '',
            examples: ['5fa2d5cffc13ae5d48000000'],
            pattern: '^.*$',
          },
        },
      },
      domain: {
        $id: '#root/items/domain',
        title: 'Domain',
        type: 'string',
        default: '',
        examples: ['w3.org'],
        pattern: '^.*$',
      },
      visitors: {
        $id: '#root/items/visitors',
        title: 'Visitors',
        type: 'integer',
        examples: [96],
        default: 0,
      },
      date: {
        $id: '#root/items/date',
        title: 'Date',
        type: 'string',
        default: '',
        examples: ['2020-01-16T04:23:13Z'],
        pattern: '^.*$',
      },
    },
  },
};

module.exports = { JSON_SCHEMA: JSON_SCHEMA };
