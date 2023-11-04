import { Injectable } from '@nestjs/common';
import {
  ActionRelations,
  ActionService,
  AppletConfigService,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import MicroServiceUtils from '@app/common/micro.service.utils';

@Injectable()
export class NewsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly actionService: ActionService,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  NYT_API_KEY = this.configService.get('NYT_API_KEY');
  NYT_URL = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${this.NYT_API_KEY}`;

  cron(): void {
    this.onNewNYTArticle();
  }

  /**
   * Triggered when a new article is published on the New York Times
   */
  async onNewNYTArticle(): Promise<void> {
    // TODO: UNCOMMENT
    /*
    const response = await fetch(this.NYT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
     */
    // TODO: REMOVE
    const data = {
      results: [
        {
          updated_date: undefined,
        },
      ],
    };

    const articleUpdatedDate: string | null =
      data.results[0]?.updated_date || null;
    if (!articleUpdatedDate) return;

    const action = await this.actionService.findOne(
      {
        key: 'nyt_article',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;

      const { lastArticleUpdatedDate } = MicroServiceUtils.getConfigs(
        actionApplet,
        ['lastArticleUpdatedDate'],
      );

      if (!lastArticleUpdatedDate) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: articleUpdatedDate,
          key: 'lastArticleUpdatedDate',
        });
        continue;
      }

      const articleUpdatedDateValue = new Date(articleUpdatedDate);
      const lastArticleUpdatedDateValue = new Date(
        lastArticleUpdatedDate.value,
      );
      if (!articleUpdatedDateValue || !lastArticleUpdatedDateValue) continue;

      if (articleUpdatedDateValue > lastArticleUpdatedDateValue) {
        await this.appletConfigService.update(lastArticleUpdatedDate.id, {
          value: articleUpdatedDate,
        });
        MicroServiceUtils.callReactions(
          this.configService,
          actionApplet.applet.reactions,
        );
      }
    }
  }
}
