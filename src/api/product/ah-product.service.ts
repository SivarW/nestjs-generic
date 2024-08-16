import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AhProductService {
  constructor(private readonly httpService: HttpService) {}

  public async searchProducts(
    query: string,
    accessToken: string,
  ): Promise<any> {
    const url = `https://api.ah.nl/mobile-services/product/search/v2`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'X-Application': 'AHWEBSHOP',
    };
    const params = {
      //query: query,
      //sortOn: 'RELEVANCE',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, params }),
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to search products: ${(error as any).message}`);
    }
  }

  public async getAccessToken(): Promise<string> {
    const url = 'https://api.ah.nl/mobile-auth/v1/auth/token/anonymous';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, { clientId: 'appie' }),
      );
      return response.data['access_token'];
    } catch (err) {
      throw new Error(`Failed to get anonymous token: ${(err as any).message}`);
    }
  }
}
