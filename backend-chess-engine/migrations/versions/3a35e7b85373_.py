"""empty message

Revision ID: 3a35e7b85373
Revises: 1c805037528f
Create Date: 2023-08-10 11:45:46.006944

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a35e7b85373'
down_revision = '1c805037528f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('game', sa.Column('opening_variation', sa.String(), nullable=True))
    op.drop_column('game', 'user_move')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('game', sa.Column('user_move', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('game', 'opening_variation')
    # ### end Alembic commands ###
