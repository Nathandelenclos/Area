import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ActionRelations,
  ActionService,
  AppletConfigService,
} from '@app/common';
import MicroServiceUtils from '@app/common/micro.service.utils';

@Injectable()
export class WeatherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly actionService: ActionService,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  cron(): void {
    Promise.all([this.onRain(), this.onSun()]);
  }

  WEATHER_API_KEY = this.configService.get('WEATHER_API_KEY');
  CITY_CODE_URL = `http://dataservice.accuweather.com/locations/v1/cities/search/?apikey=${this.WEATHER_API_KEY}`;
  WEATHER_URL = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/`;

  /**
   * Get the city code from the city name
   * @param city The city name
   * @returns The city code
   */
  async getCityCode(city: string): Promise<string> {
    const response = await fetch(`${this.CITY_CODE_URL}&q=${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data[0]?.Key;
  }

  async getWeather(cityCode: string): Promise<any> {
    const response = await fetch(
      `${this.WEATHER_URL}${cityCode}?apikey=${this.WEATHER_API_KEY}&details=true&metric=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (!data) return null;
    return data?.[0];
  }

  /**
   * Triggered when the weather changes to rain
   */
  async onRain(): Promise<void> {
    const action = await this.actionService.findOne(
      {
        key: 'on_rain',
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

      const { city } = MicroServiceUtils.getConfigs(actionApplet, ['city']);
      if (!city) continue;

      const cityCode = await this.getCityCode(city.value);
      if (!cityCode) continue;

      const weather = await this.getWeather(cityCode);
      if (!weather) continue;

      const hasPrecipitation = weather?.['HasPrecipitation'];
      const { lastHasPrecipitation } = MicroServiceUtils.getConfigs(
        actionApplet,
        ['lastHasPrecipitation'],
      );

      if (!lastHasPrecipitation) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: hasPrecipitation ? 'true' : 'false',
          key: 'lastHasPrecipitation',
        });
        continue;
      }

      if (hasPrecipitation === (lastHasPrecipitation.value === 'true'))
        continue;

      await this.appletConfigService.update(lastHasPrecipitation.id, {
        value: hasPrecipitation ? 'true' : 'false',
      });

      if (!hasPrecipitation) continue;
      MicroServiceUtils.callReactions(
        this.configService,
        actionApplet.applet.reactions,
      );
    }
  }

  async onSun(): Promise<void> {
    const action = await this.actionService.findOne(
      {
        key: 'on_sun',
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

      const { city } = MicroServiceUtils.getConfigs(actionApplet, ['city']);
      if (!city) continue;

      const cityCode = await this.getCityCode(city.value);
      if (!cityCode) continue;

      const weather = await this.getWeather(cityCode);
      if (!weather) continue;

      const hasSun = weather?.['CloudCover'] < 30;
      const { lastHasSun } = MicroServiceUtils.getConfigs(actionApplet, [
        'lastHasSun',
      ]);
      if (!lastHasSun) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: hasSun ? 'true' : 'false',
          key: 'lastHasSun',
        });
        continue;
      }

      if (hasSun === (lastHasSun.value === 'true')) continue;
      await this.appletConfigService.update(lastHasSun.id, {
        value: hasSun ? 'true' : 'false',
      });

      if (!hasSun) continue;
      MicroServiceUtils.callReactions(
        this.configService,
        actionApplet.applet.reactions,
      );
    }
  }
}
