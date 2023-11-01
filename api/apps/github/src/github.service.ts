import { Injectable } from '@nestjs/common';
import {
  ActionAppletEntity,
  ActionRelations,
  ActionService,
  AppletConfigService,
  MicroServiceInit,
  ReactionAppletEntity,
  ReactionService,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from 'crypto-js';

@Injectable()
export class GithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly actionService: ActionService,
    private readonly reactionService: ReactionService,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  BASE_URL = 'https://api.github.com';

  cron(): void {
    Promise.all([
      this.onNewBranches(),
      this.onNewCommits(),
      this.onNewIssues(),
      this.onNewPullRequests(),
      this.onNewRepos(),
      this.onNewSSH(),
    ]);
  }

  callReactions(reactions: ReactionAppletEntity[]) {
    for (const reaction of reactions) {
      MicroServiceInit.getMicroservice(
        this.configService,
        reaction.reaction.service.rmq_queue,
      ).emit(
        reaction.reaction.cmd,
        reaction.configs.reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {}),
      );
    }
  }

  fetchGithubApi(url: string, accessToken: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }).then((response) => {
        if (response.status !== 200) {
          reject(response);
        }
        response.json().then((data) => {
          resolve(data);
        });
      });
    });
  }

  getAccessToken(actionApplet: ActionAppletEntity): string {
    const oauth_id = actionApplet.configs.find((e) => e.key === 'oauth_id');
    if (!oauth_id) return '';
    const oauth = actionApplet.applet.user.oauth.find(
      (e) => e.id === +oauth_id.value,
    );
    if (!oauth) return '';
    return AES.decrypt(
      oauth.refreshToken,
      this.configService.get('AES_SECRET'),
    ).toString(enc.Utf8);
  }

  getConfigs(actionApplet: ActionAppletEntity, keys: string[]): any {
    const configs = {};
    for (const key of keys) {
      const config = actionApplet.configs.find((e) => e.key === key);
      if (!config) continue;
      configs[key] = config.value;
    }
    return configs;
  }

  runWorkflow(workflow_id: string, oauth_id: number): void {
    console.log('Github runWorkflow', workflow_id, oauth_id);
  }

  runFailedWorkflow(workflow_id: string, oauth_id: number): void {
    console.log('Github runFailedWorkflow', workflow_id, oauth_id);
  }

  async onNewRepos() {
    const action = await this.actionService.findOne(
      {
        key: 'on_new_repos',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const username = actionApplet.configs.find((e) => e.key === 'username');
      if (!username) continue;
      const accessToken = this.getAccessToken(actionApplet);
      if (!accessToken) continue;
      const response = await this.fetchGithubApi(
        `${this.BASE_URL}/users/${username.value}/repos`,
        accessToken,
      );
      const repos = actionApplet.configs.find((e) => e.key === 'repos_length');
      if (!repos) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: response.length.toString(),
          key: 'repos_length',
        });
        continue;
      }
      if (response.length > +repos.value) {
        await this.appletConfigService.update(repos.id, {
          value: response.length.toString(),
        });
        this.callReactions(actionApplet.applet.reactions);
      }
    }
  }

  async onNewSSH() {
    const action = await this.actionService.findOne(
      {
        key: 'on_new_ssh',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const username = actionApplet.configs.find((e) => e.key === 'username');
      if (!username) continue;
      const accessToken = this.getAccessToken(actionApplet);
      if (!accessToken) continue;
      const response = await this.fetchGithubApi(
        `${this.BASE_URL}/users/${username.value}/keys`,
        accessToken,
      );
      const keys = actionApplet.configs.find((e) => e.key === 'keys_length');
      if (!keys) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: response.length.toString(),
          key: 'keys_length',
        });
        continue;
      }
      if (response.length > +keys.value) {
        await this.appletConfigService.update(keys.id, {
          value: response.length.toString(),
        });
        this.callReactions(actionApplet.applet.reactions);
      }
    }
  }

  async onNewBranches() {
    const action = await this.actionService.findOne(
      {
        key: 'on_new_branch',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const owner = actionApplet.configs.find((e) => e.key === 'owner');
      if (!owner) continue;
      const repos = actionApplet.configs.find((e) => e.key === 'repos');
      if (!repos) continue;
      const accessToken = this.getAccessToken(actionApplet);
      if (!accessToken) continue;
      const response = await this.fetchGithubApi(
        `${this.BASE_URL}/repos/${owner.value}/${repos.value}/branches`,
        accessToken,
      );
      const branches = actionApplet.configs.find(
        (e) => e.key === 'branch_length',
      );
      if (!branches) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: response.length.toString(),
          key: 'branch_length',
        });
        continue;
      }
      if (response.length > +branches.value) {
        await this.appletConfigService.update(branches.id, {
          value: response.length.toString(),
        });
        this.callReactions(actionApplet.applet.reactions);
      }
    }
  }

  async onNewPullRequests() {
    const action = await this.actionService.findOne(
      {
        key: 'on_new_pull_request',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const owner = actionApplet.configs.find((e) => e.key === 'owner');
      if (!owner) continue;
      const repos = actionApplet.configs.find((e) => e.key === 'repos');
      if (!repos) continue;
      const accessToken = this.getAccessToken(actionApplet);
      if (!accessToken) continue;
      const response = await this.fetchGithubApi(
        `${this.BASE_URL}/repos/${owner.value}/${repos.value}/pulls`,
        accessToken,
      );
      const pulls = actionApplet.configs.find((e) => e.key === 'pulls_length');
      if (!pulls) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: response.length.toString(),
          key: 'pulls_length',
        });
        continue;
      }
      if (response.length > +pulls.value) {
        await this.appletConfigService.update(pulls.id, {
          value: response.length.toString(),
        });
        this.callReactions(actionApplet.applet.reactions);
      }
    }
  }

  async onNewIssues() {
    const action = await this.actionService.findOne(
      {
        key: 'on_new_issue',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const owner = actionApplet.configs.find((e) => e.key === 'owner');
      if (!owner) continue;
      const repos = actionApplet.configs.find((e) => e.key === 'repos');
      if (!repos) continue;
      const accessToken = this.getAccessToken(actionApplet);
      if (!accessToken) continue;
      const response = await this.fetchGithubApi(
        `${this.BASE_URL}/repos/${owner.value}/${repos.value}/issues`,
        accessToken,
      );
      const issues = actionApplet.configs.find(
        (e) => e.key === 'issues_length',
      );
      if (!issues) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: response.length.toString(),
          key: 'issues_length',
        });
        continue;
      }
      if (response.length > +issues.value) {
        await this.appletConfigService.update(issues.id, {
          value: response.length.toString(),
        });
        this.callReactions(actionApplet.applet.reactions);
      }
    }
  }

  async onNewCommits() {
    const action = await this.actionService.findOne(
      {
        key: 'on_new_commit',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const owner = actionApplet.configs.find((e) => e.key === 'owner');
      if (!owner) continue;
      const repos = actionApplet.configs.find((e) => e.key === 'repos');
      if (!repos) continue;
      const accessToken = this.getAccessToken(actionApplet);
      if (!accessToken) continue;
      const response = await this.fetchGithubApi(
        `${this.BASE_URL}/repos/${owner.value}/${repos.value}/commits`,
        accessToken,
      );
      const commit = actionApplet.configs.find(
        (e) => e.key === 'commit_length',
      );
      if (!commit) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: response.length.toString(),
          key: 'commit_length',
        });
        continue;
      }
      if (response.length > +commit.value) {
        await this.appletConfigService.update(commit.id, {
          value: response.length.toString(),
        });
        this.callReactions(actionApplet.applet.reactions);
      }
    }
  }
}
