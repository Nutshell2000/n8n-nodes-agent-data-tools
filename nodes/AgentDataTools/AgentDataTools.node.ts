import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { companyDescription } from './resources/company';
import { cryptoDescription } from './resources/crypto';
import { githubRepositoryDescription, vulnerabilityDescription } from './resources/developer';
import { newsDescription } from './resources/news';
import { screeningDescription } from './resources/screening';
import { speechDescription } from './resources/speech';
import { webDescription } from './resources/web';

export class AgentDataTools implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Agent Data Tools',
		name: 'agentDataTools',
		icon: {
			light: 'file:../../icons/agentDataTools.svg',
			dark: 'file:../../icons/agentDataTools.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Web search, page text, news, GitHub, CVE, company, crypto, speech and sanctions tools, paid per call with one prepaid key',
		defaults: {
			name: 'Agent Data Tools',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'agentDataToolsApi',
				// Every operation is paid, so the credential is always shown. It is not required, so
				// the free "Return Sample Only" option still runs without a key; a paid call without
				// one gets the service's 402 answer, which says where to buy one.
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://agent-data-tools.revmesh2074.workers.dev',
			headers: {
				Accept: 'application/json',
				'User-Agent': 'n8n-nodes-agent-data-tools',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'company',
						description: 'Company profiles and SEC filings',
					},
					{
						name: 'Crypto',
						value: 'crypto',
						description: 'Token prices and technical indicators',
					},
					{
						name: 'GitHub Repository',
						value: 'githubRepository',
						description: 'Facts about a public repository',
					},
					{
						name: 'News',
						value: 'news',
						description: 'News headlines and their sentiment',
					},
					{
						name: 'Screening',
						value: 'screening',
						description: 'OFAC sanctions and payee checks',
					},
					{
						name: 'Speech',
						value: 'speech',
						description: 'Text to speech',
					},
					{
						name: 'Vulnerability',
						value: 'vulnerability',
						description: 'CVE lookup',
					},
					{
						name: 'Web',
						value: 'web',
						description: 'Web search, page reading and website audits',
					},
				],
				default: 'web',
			},
			...companyDescription,
			...cryptoDescription,
			...githubRepositoryDescription,
			...newsDescription,
			...screeningDescription,
			...speechDescription,
				...vulnerabilityDescription,
			...webDescription,
		],
	};
}
