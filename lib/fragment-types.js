export const IntrospectionFragmentData = {
  '__schema': {
    'queryType': {
      'name': 'Query'
    },
    'mutationType': {
      'name': 'Mutation'
    },
    'subscriptionType': null,
    'types': [
      {
        'kind': 'INTERFACE',
        'name': 'MerchantInfo',
        'description': null,
        'fields': [
          {
            'name': 'name',
            'description': null,
            'args': [],
            'type': {
              'kind': 'NON_NULL',
              'name': null,
              'ofType': {
                'kind': 'SCALAR',
                'name': 'String',
                'ofType': null
              }
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'logo',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'number',
            'description': null,
            'args': [],
            'type': {
              'kind': 'NON_NULL',
              'name': null,
              'ofType': {
                'kind': 'SCALAR',
                'name': 'Int',
                'ofType': null
              }
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'email',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'phone',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'siteSettings',
            'description': null,
            'args': [],
            'type': {
              'kind': 'NON_NULL',
              'name': null,
              'ofType': {
                'kind': 'INTERFACE',
                'name': 'MerchantPublicSiteSettings',
                'ofType': null
              }
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'socialLinks',
            'description': null,
            'args': [],
            'type': {
              'kind': 'NON_NULL',
              'name': null,
              'ofType': {
                'kind': 'OBJECT',
                'name': 'SocialLinks',
                'ofType': null
              }
            },
            'isDeprecated': false,
            'deprecationReason': null
          }
        ],
        'inputFields': null,
        'interfaces': null,
        'enumValues': null,
        'possibleTypes': [
          {
            'kind': 'OBJECT',
            'name': 'AgentMerchantInfo',
            'ofType': null
          },
          {
            'kind': 'OBJECT',
            'name': 'DealerMerchantInfo',
            'ofType': null
          }
        ]
      },
      {
        'kind': 'INTERFACE',
        'name': 'MerchantPublicSiteSettings',
        'description': null,
        'fields': [
          {
            'name': 'primaryColor',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'secondaryColor',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'alias',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'headlineText1',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'headlineText2',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          },
          {
            'name': 'headlineText3',
            'description': null,
            'args': [],
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'isDeprecated': false,
            'deprecationReason': null
          }
        ],
        'inputFields': null,
        'interfaces': null,
        'enumValues': null,
        'possibleTypes': [
          {
            'kind': 'OBJECT',
            'name': 'AgentPublicSiteSettings',
            'ofType': null
          },
          {
            'kind': 'OBJECT',
            'name': 'DealerPublicSiteSettings',
            'ofType': null
          }
        ]
      }
    ],
    'directives': [
      {
        'name': 'include',
        'description': 'Directs the executor to include this field or fragment only when the `if` argument is true.',
        'locations': [
          'FIELD',
          'FRAGMENT_SPREAD',
          'INLINE_FRAGMENT'
        ],
        'args': [
          {
            'name': 'if',
            'description': 'Included when true.',
            'type': {
              'kind': 'NON_NULL',
              'name': null,
              'ofType': {
                'kind': 'SCALAR',
                'name': 'Boolean',
                'ofType': null
              }
            },
            'defaultValue': null
          }
        ]
      },
      {
        'name': 'skip',
        'description': 'Directs the executor to skip this field or fragment when the `if` argument is true.',
        'locations': [
          'FIELD',
          'FRAGMENT_SPREAD',
          'INLINE_FRAGMENT'
        ],
        'args': [
          {
            'name': 'if',
            'description': 'Skipped when true.',
            'type': {
              'kind': 'NON_NULL',
              'name': null,
              'ofType': {
                'kind': 'SCALAR',
                'name': 'Boolean',
                'ofType': null
              }
            },
            'defaultValue': null
          }
        ]
      },
      {
        'name': 'deprecated',
        'description': 'Marks an element of a GraphQL schema as no longer supported.',
        'locations': [
          'FIELD_DEFINITION',
          'ENUM_VALUE'
        ],
        'args': [
          {
            'name': 'reason',
            'description': 'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/).',
            'type': {
              'kind': 'SCALAR',
              'name': 'String',
              'ofType': null
            },
            'defaultValue': '\'No longer supported\''
          }
        ]
      }
    ]
  }
}
