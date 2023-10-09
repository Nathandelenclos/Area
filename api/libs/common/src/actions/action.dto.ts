import { ServiceEntity } from '@app/common/services/service.entity';

export interface NewAction {
  name: string;
  description: string;
  is_available: boolean;
  service: ServiceEntity;
}
