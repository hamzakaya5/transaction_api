import { IsNumber, IsOptional, IsDate, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterTransactionDto {
  // Amount range
  @IsOptional()
  @IsNumber()
  @Type(() => Number)   // transform "100" -> 100
  min?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  max?: number;

  // Date range
  @IsOptional()
  @IsDate()
  @Type(() => Date)     // transform "2025-09-01" -> Date
  minDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  maxDate?: Date;

  // Status filter
  @IsOptional()
  @IsString()
  status?: string;

  // JSONB field: cardBrand
  @IsOptional()
  @IsString()
  cardBrand?: string;

  // Case-insensitive vendor name (admin only)
  @IsOptional()
  @IsString()
  vendorName?: string;

  // Pagination
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;

  // Sorting
  @IsOptional()
  @IsString()
  sort: string = 'createdAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC' = 'DESC';
}
