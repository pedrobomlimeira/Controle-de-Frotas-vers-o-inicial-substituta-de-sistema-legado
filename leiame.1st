Sistema de Controle de Frotas Multi-empresa

Sistema web para gerenciamento completo de frotas com suporte a múltiplas empresas, controle de veículos, motoristas, manutenções e despesas, incluindo autenticação 2FA por email, segregação de dados por empresa e sistema de solicitação de veículos.

Funcionalidades Principais
 Sistema de login com seleção de empresa e autenticação 2FA
 Dashboard principal com status da frota por empresa (veículos disponíveis/em manutenção/em uso)
 Cadastros de empresas, veículos, motoristas e tipos de serviços/manutenções
 Sistema de solicitação de veículos com:

Interface web para usuários e API REST para integração
Agendamento com data/hora de início e fim
Dados do solicitante, destino, finalidade e número de passageiros
Aprovação automática ou manual conforme regras da empresa
Notificações por email para solicitante e gestores
Registro de saídas/chegadas com quilometragem, motorista responsável e observações
Controle de abastecimentos e despesas com relatórios por período/veículo/empresa
Histórico completo de manutenções por grupo de serviços e tipos de veículos
Sistema de identificação por QR Code para veículos e motoristas



Sugestão de UI: Layout moderno com sidebar de navegação, seletor de empresa no topo, cards para resumo de informações importantes e tabelas com filtros para listagem dos dados segregados por empresa. Calendário visual para agendamentos de veículos.

Manual do Usuário
1. Acesso ao Sistema
Acesse o sistema através do navegador usando a URL fornecida
Faça login com seu email corporativo
Complete a autenticação 2FA usando o código enviado por email
Selecione a empresa desejada no seletor do topo

2. Dashboard
Visualize o status geral da frota
Acompanhe veículos disponíveis, em uso e em manutenção
Acesse rapidamente as principais funções através dos cards

3. Solicitação de Veículos
Use o formulário de solicitação informando:
Data/hora de início e fim
Destino e finalidade
Número de passageiros
Acompanhe o status da solicitação no calendário
Receba notificações por email sobre aprovações/rejeições

4. Gestão de Veículos e Motoristas
Cadastre e gerencie veículos com informações detalhadas
Mantenha registro de motoristas e suas qualificações
Use QR Codes para identificação rápida

5. Manutenções e Despesas
Registre manutenções preventivas e corretivas
Controle abastecimentos e despesas
Gere relatórios por período ou veículo

Manual do Desenvolvedor
1. Arquitetura
Frontend: React + TypeScript + Vite
UI Components: Radix UI + Tailwind CSS
Internacionalização: i18next
Gerenciamento de Estado: React Context + Hooks
Backend: Node.js + Express
Banco de Dados: PostgreSQL + Supabase

2. Instalação Local
2.1. Pré-requisitos
Node.js 18+ instalado
NPM 8+ instalado
PostgreSQL 14+ instalado
Git instalado

2.2. Configuração do Banco de Dados
Crie um banco de dados PostgreSQL:
createdb fleet_management
Execute as migrações iniciais:
 psql -d fleet_management -f ./database/migrations/init.sql
Popule dados iniciais (opcional):
 psql -d fleet_management -f ./database/seeds/demo.sql

2.3. Estrutura do Banco de Dados
2.3.1. Pasta database
database/
├── migrations/
│   ├── init.sql
│   ├── 001_create_companies.sql
│   ├── 002_create_users.sql
│   ├── 003_create_vehicles.sql
│   ├── 004_create_drivers.sql
│   ├── 005_create_maintenance.sql
│   ├── 006_create_expenses.sql
│   └── 007_create_vehicle_requests.sql
├── seeds/
│   ├── demo.sql
│   ├── companies.sql
│   ├── users.sql
│   ├── vehicles.sql
│   └── drivers.sql
└── schemas/
    ├── companies.sql
    ├── users.sql
    ├── vehicles.sql
    ├── drivers.sql
    ├── maintenance.sql
    ├── expenses.sql
    └── vehicle_requests.sql

2.3.2. Principais Tabelas
-- companies
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- vehicles
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    plate VARCHAR(20) UNIQUE NOT NULL,
    model VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- vehicle_requests
CREATE TABLE vehicle_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    vehicle_id UUID REFERENCES vehicles(id),
    requester_id UUID REFERENCES users(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2.4. Configuração do Projeto
Clone o repositório:
 git clone https://github.com/seu-usuario/fleet-management.git
 cd fleet-management

Instale as dependências:
 npm install

Copie o arquivo de ambiente:
 cp .env.example .env

Configure as variáveis de ambiente no arquivo .env:

DATABASE_URL=postgresql://usuario:senha@localhost:5432/fleet_management
SUPABASE_URL=sua_url_supabase
SUPABASE_ANON_KEY=sua_chave_supabase
SMTP_HOST=seu_servidor_smtp
SMTP_USER=seu_usuario_smtp
SMTP_PASS=sua_senha_smtp


Inicie o servidor de desenvolvimento:
 npm run dev

2.5. Verificação da Instalação
Acesse http://localhost:5173 no navegador
Faça login com as credenciais padrão:
 Email: admin@fleet.com
 Senha: admin123

Verifique se o dashboard está carregando corretamente
3. Estrutura do Projeto
 src/components: Componentes React organizados por módulo
 src/lib: Utilitários, APIs e configurações
 src/types: Definições de tipos TypeScript
 src/i18n: Arquivos de tradução 
 database/migrations: Scripts SQL de migração
 database/seeds: Dados iniciais para desenvolvimento
 database/schemas: Definições das tabelas

4. APIs e Integrações
 REST API para todas as operações CRUD
 Autenticação via JWT + 2FA
 Upload de arquivos para anexos
 Envio de emails via serviço SMTP
 
Documentação Técnica
1. Requisitos do Sistema
 Node.js 18+
 NPM 8+
 PostgreSQL 14+
 Navegadores modernos (Chrome, Firefox, Safari, Edge)

2. Segurança
 Autenticação em duas etapas (2FA)
 Segregação de dados por empresa
 Controle de acesso baseado em funções (RBAC)
 Proteção contra CSRF e XSS

3. Performance
 Lazy loading de componentes
 Otimização de imagens
 Caching de dados
 Paginação de listagens

4. Manutenção
 Logs de sistema
 Monitoramento de erros
 Backup automático
 Atualizações de segurança
